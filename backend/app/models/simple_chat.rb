class SimpleChat < ApplicationRecord
  acts_as_tenant
  belongs_to :seller
  has_many :simple_chat_sections, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "simple_chats"

  accepts_nested_attributes_for :simple_chat_sections, allow_destroy: true

  validates :name, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "name", "chat_bubble_text", "chat_bubble_extra_text", "lock_version", "owner_id",
             "use_seller_animation")
      .merge(extra_attributes)
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  private

  def extra_attributes
    result = {
      seller: seller_attributes,
      type: "SimpleChat",
      trigger_ids: triggers.ids,
    }
    if simple_chat_sections.any?
      result[:simple_chat_sections_attributes] = simple_chat_sections.order(:order).map(&:as_json)
    end
    result
  end

  def seller_attributes # rubocop:disable Metrics/AbcSize
    {
      id: seller.id, name: seller.name, description: seller.description,
      profile_pic: { url: seller.profile_pic.url }, picRect: seller.pic_rect,
      profile_pic_animation: { url: seller.profile_pic_animation&.url }, instagram_url: seller.instagram_url,
    }
  end
end
