class Product < ApplicationRecord
  belongs_to :user, optional: true
  has_many :likes
  has_many :comments

  validates :product_ref, presence: true, uniqueness: true
end
