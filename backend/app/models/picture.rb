class Picture < ApplicationRecord
  include CleanupAssets

  acts_as_tenant

  paginates_per 10

  has_many :personas_with_profile_pic, class_name: "Persona", foreign_key: :profile_pic_id,
                                       dependent: :restrict_with_exception, inverse_of: :profile_pic
  has_many :personas_with_profile_pic_animation, class_name: "Persona", foreign_key: :profile_pic_animation_id,
                                                 dependent: :restrict_with_exception, inverse_of: :profile_pic_animation
  has_many :product_picks, foreign_key: :pic_id, dependent: :restrict_with_exception, inverse_of: :pic
  has_many :simple_chat_product_messages, foreign_key: :pic_id, dependent: :restrict_with_exception, inverse_of: :pic
  has_many :simple_chat_picture_messages, foreign_key: :pic_id, dependent: :restrict_with_exception, inverse_of: :pic

  enum file_format: %i[jpeg png gif]

  validate :url_must_be_valid
  validates :url, presence: true, uniqueness: true

  after_touch :set_active

  def personas
    personas_with_profile_pic + personas_with_profile_pic_animation
  end

  def simple_chat_messages
    simple_chat_product_messages + simple_chat_picture_messages
  end

  def as_json(_options = {})
    attributes
      .slice("id", "url", "created_at", "updated_at")
      .merge(personas: personas,
             product_picks: product_picks,
             simple_chat_messages: simple_chat_messages)
  end

  def url_must_be_valid
    return if url&.starts_with?("http")

    errors.add(:url, "is invalid")
  end

  def active?
    personas_with_profile_pic.any? || personas_with_profile_pic_animation.any? ||
      product_picks.any? || simple_chat_product_messages.any? || simple_chat_picture_messages.any?
  end

  def set_active
    update!(active: active?)
  end
end
