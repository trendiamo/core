class SimpleChat < ApplicationRecord
  acts_as_tenant :account, optional: true
  belongs_to :brand, optional: true
  belongs_to :seller, optional: true
  has_many :simple_chat_sections, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "simple_chats"

  accepts_nested_attributes_for :simple_chat_sections, allow_destroy: true

  validates :name, presence: true

  def as_json(options = {})
    result = attributes.slice("id", "account_id", "heading", "name", "teaser_message", "extra_teaser_message",
                              "lock_version", "owner_id", "use_seller_animation")
                       .merge(extra_attributes)
    result.merge!(simple_chat_sections_attributes) unless options[:skip_sections_attributes]
    result
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  private

  def extra_attributes
    {
      brand: brand&.slice("id", "name", "logo_url"),
      seller: seller ? seller_attributes : owner_as_seller_attributes,
      type: "SimpleChat",
      trigger_ids: triggers.ids,
    }
  end

  def simple_chat_sections_attributes
    return unless simple_chat_sections.any?

    {
      simple_chat_sections_attributes: simple_chat_sections.order(:order).map(&:as_json),
    }
  end

  def seller_attributes # rubocop:disable Metrics/AbcSize
    {
      id: seller.id, name: seller.name, bio: seller.bio, img: { url: seller.img.url }, imgRect: seller.img_rect,
      animated_img: { url: seller.animated_img&.url }, instagram_url: seller.instagram_url,
    }
  end

  def owner_as_seller_attributes
    {
      name: owner.name, bio: owner.bio, img: { url: owner.img_url }, imgRect: owner.img_rect,
      animated_img: { url: nil }, social_media_url: owner.social_media_url,
    }
  end
end
