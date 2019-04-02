class Picture < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  has_many :navigation_items, foreign_key: :pic_id
  has_many :personas, foreign_key: :profile_pic_id
  has_many :product_picks, foreign_key: :pic_id

  validates :url, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes
      .slice("id", "url", "created_at", "updated_at")
      .merge(navigation_items: navigation_items,
             personas: personas,
             product_picks: product_picks)
  end
end
