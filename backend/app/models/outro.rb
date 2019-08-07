class Outro < ApplicationRecord
  acts_as_tenant
  belongs_to :seller
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "outros"

  validates :name, presence: true
  validates :teaser_message, presence: true
  validates :chat_bubble_button_no, presence: true
  validates :chat_bubble_button_yes, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "teaser_message", "chat_bubble_button_no", "chat_bubble_button_yes",
             "use_seller_animation", "created_at", "updated_at", "lock_version")
      .merge(seller: seller_attributes(seller), type: "Outro", trigger_ids: triggers.ids)
  end

  def seller_attributes(seller)
    {
      id: seller.id, name: seller.name, instagram_url: seller.instagram_url,
      img: { url: seller.img.url }, img_rect: seller.img_rect, animated_img: { url: seller.animated_img&.url },
      profile_pic: { url: seller.img.url }, pic_rect: seller.img_rect,
      profile_pic_animation: { url: seller.animated_img&.url },
    }
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end
end
