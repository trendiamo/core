class FencedCollection < ApplicationRecord
  DOMAIN_NAME_REGEXP = /\A[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\z/
  belongs_to :collection

  validates :domain_name, presence: true, uniqueness: true, format: { with: DOMAIN_NAME_REGEXP }
end
