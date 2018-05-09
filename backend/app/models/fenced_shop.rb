class FencedShop < ApplicationRecord
  validates :domain_name, presence: true, uniqueness: true
end
