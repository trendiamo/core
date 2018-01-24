class Like < ApplicationRecord
  validates :consumer_ref, presence: true
  validates :product_ref, presence: true
end
