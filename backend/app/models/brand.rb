class Brand < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, uniqueness: true
  validates :legal_name, presence: true, uniqueness: true
  validates :legal_address_city, presence: true
  validates :legal_address_number, presence: true
  validates :legal_address_postal_code, presence: true
  validates :legal_address_street, presence: true
  validates :legal_address_country, presence: true
end
