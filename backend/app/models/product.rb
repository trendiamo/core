class Product < ApplicationRecord
  belongs_to :user, optional: true
  has_many :likes
  has_many :comments

  validates :product_ref, presence: true, uniqueness: true

  def likes_count
    read_attribute(:likes_count) + [anonymous_likes_count, 0].max
  end
end
