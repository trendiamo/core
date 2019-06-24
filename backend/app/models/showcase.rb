class Showcase < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :spotlights, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :spotlights, presence: true
  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "showcases"

  accepts_nested_attributes_for :spotlights, allow_destroy: true

  validates :name, presence: true
  validates :title, presence: true
  validates :subtitle, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "subtitle", "name", "chat_bubble_text", "chat_bubble_extra_text", "created_at",
             "updated_at", "lock_version")
      .merge(persona: { id: persona.id, profile_pic: { url: persona.profile_pic_url }, name: persona.name,
                        pic_rect: persona.pic_rect, },
             spotlights_attributes: spotlights_attributes(spotlights),
             type: "Showcase",
             trigger_ids: triggers.ids)
  end

  def spotlights_attributes(spotlights)
    spotlights.order(:order).map do |spotlight|
      {
        id: spotlight.id,
        persona: persona_attributes(spotlight),
        product_picks_attributes: product_picks_attributes(spotlight.product_picks),
      }
    end
  end

  def persona_attributes(spotlight)
    {
      id: spotlight.persona.id,
      name: spotlight.persona.name,
      description: spotlight.persona.description,
      instagram_url: spotlight.persona.instagram_url,
      profile_pic: { url: spotlight.persona.profile_pic.url },
      profile_pic_animation_url: spotlight.persona.profile_pic_animation_url,
      pic_rect: spotlight.persona.pic_rect,
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
      picture: { url: product_pick.pic.url },
      pic_rect: product_pick.pic_rect,
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
