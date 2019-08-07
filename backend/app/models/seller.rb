class Seller < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  has_many :showcases, dependent: :destroy
  has_many :spotlights, dependent: :destroy
  has_many :simple_chats, dependent: :destroy
  has_many :outros, dependent: :destroy
  belongs_to :img, class_name: "Image", touch: true
  belongs_to :animated_img, class_name: "Image", optional: true, touch: true

  validates :name, presence: true
  validates :bio, presence: true
  validate :animation_in_use_cannot_be_removed

  def modules
    showcases + spotlights + simple_chats + outros
  end

  def as_json(_options = {})
    attributes
      .slice("id", "name", "bio", "account_id", "graphcms_ref", "instagram_url", "img_rect", "created_at", "updated_at",
             "lock_version")
      .merge(img: { url: img.url }, animated_img: { url: animated_img&.url })
      .merge(profile_pic: { url: img.url }, profile_pic_animation: { url: animated_img&.url }, pic_rect: img_rect)
  end

  def animation_in_use_cannot_be_removed
    return unless animated_img&.url.blank? && modules.any?(&:use_seller_animation)

    errors.add(:animated_img, "is used in your modules")
  end
end
