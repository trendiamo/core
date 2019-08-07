class Showcase < ApplicationRecord
  acts_as_tenant
  belongs_to :seller
  has_many :spotlights, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :spotlights, presence: true
  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "showcases"

  accepts_nested_attributes_for :spotlights, allow_destroy: true

  validates :name, presence: true
  validates :heading, presence: true
  validates :subheading, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "heading", "subheading", "name", "teaser_message", "extra_teaser_message",
             "use_seller_animation", "created_at", "updated_at", "lock_version")
      .merge(seller: seller_attributes(seller),
             spotlights_attributes: spotlights_attributes(spotlights),
             type: "Showcase",
             trigger_ids: triggers.ids)
  end

  def seller_attributes(seller)
    { id: seller.id, img: { url: seller.img.url }, name: seller.name, img_rect: seller.img_rect,
      animated_img: { url: seller.animated_img&.url }, }
  end

  def spotlights_attributes(spotlights)
    spotlights.order(:order).map do |spotlight|
      {
        id: spotlight.id,
        seller: spotlight_seller_attributes(spotlight),
        use_seller_animation: spotlight.use_seller_animation,
        product_picks_attributes: product_picks_attributes(spotlight.product_picks),
      }
    end
  end

  def spotlight_seller_attributes(spotlight) # rubocop:disable Metrics/AbcSize
    {
      id: spotlight.seller.id,
      name: spotlight.seller.name,
      bio: spotlight.seller.bio,
      instagram_url: spotlight.seller.instagram_url,
      img: { url: spotlight.seller.img.url },
      animated_img: { url: spotlight.seller.animated_img&.url },
      img_rect: spotlight.seller.img_rect,
    }
  end

  def product_picks_attributes(product_picks)
    product_picks.order(:order).map { |product_pick| product_pick_attributes(product_pick) }
  end

  def product_pick_attributes(product_pick)
    {
      id: product_pick.id,
      url: product_pick.url,
      name: product_pick.name,
      description: product_pick.description,
      display_price: product_pick.display_price,
      img: { url: product_pick.img.url },
      img_rect: product_pick.img_rect,
    }
  end

  def paths
    paths = []
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    paths.push(new_step)
    spotlights.order(:order).each_with_index do |spotlight, index|
      paths.push(spotlight.paths(index))
    end
    paths
  end
end
