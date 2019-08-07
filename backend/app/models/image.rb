class Image < ApplicationRecord
  include CleanupAssets

  acts_as_tenant

  paginates_per 10

  has_many :sellers_with_img, class_name: "Seller", foreign_key: :img_id, dependent: :restrict_with_exception,
                              inverse_of: :img
  has_many :sellers_with_animated_img, class_name: "Seller", foreign_key: :animated_img_id,
                                       dependent: :restrict_with_exception, inverse_of: :animated_img
  has_many :product_picks, foreign_key: :img_id, dependent: :restrict_with_exception, inverse_of: :img
  has_many :simple_chat_product_messages, foreign_key: :img_id, dependent: :restrict_with_exception, inverse_of: :img
  has_many :simple_chat_image_messages, foreign_key: :img_id, dependent: :restrict_with_exception, inverse_of: :img

  validates :file_format, inclusion: { in: %w[gif jpeg png] }
  validate :url_must_be_valid
  validates :url, presence: true, uniqueness: true

  after_touch :set_active

  def sellers
    sellers_with_img + sellers_with_animated_img
  end

  def simple_chat_messages
    simple_chat_product_messages + simple_chat_image_messages
  end

  def as_json(_options = {})
    attributes
      .slice("id", "url", "file_format", "created_at", "updated_at")
      .merge(sellers: sellers,
             product_picks: product_picks,
             simple_chat_messages: simple_chat_messages)
  end

  def url_must_be_valid
    return if url&.starts_with?("http")

    errors.add(:url, "is invalid")
  end

  def active?
    sellers_with_img.any? || sellers_with_animated_img.any? ||
      product_picks.any? || simple_chat_product_messages.any? || simple_chat_image_messages.any?
  end

  def set_active
    update!(active: active?)
  end
end
