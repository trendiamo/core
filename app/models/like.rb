class Like < ApplicationRecord
  validates :customer_ref, presence: true
  validates :product_ref, presence: true
end
