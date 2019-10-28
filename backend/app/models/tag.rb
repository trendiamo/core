class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :users, through: :taggings
  has_many :brands, through: :taggings

  validates :name, presence: true, uniqueness: true
  validates :tag_type, presence: true, inclusion: { in: %w[product_category positive_impact_area] }

  def as_json(_options = {})
    attributes
      .slice("id", "name", "tag_type", "created_at", "updated_at")
  end
end
