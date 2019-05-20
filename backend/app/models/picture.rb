class Picture < ApplicationRecord
  include CleanupAssets

  acts_as_tenant

  paginates_per 10

  has_many :personas, foreign_key: :profile_pic_id, dependent: :restrict_with_exception, inverse_of: :profile_pic
  has_many :product_picks, foreign_key: :pic_id, dependent: :restrict_with_exception, inverse_of: :pic
  has_many :simple_chat_product_messages, foreign_key: :pic_id, dependent: :restrict_with_exception, inverse_of: :pic

  validates :url, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes
      .slice("id", "url", "created_at", "updated_at")
      .merge(personas: personas,
             product_picks: product_picks,
             simple_chat_messages: simple_chat_product_messages)
  end
end
