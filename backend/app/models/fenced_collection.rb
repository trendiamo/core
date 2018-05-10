class FencedCollection < ApplicationRecord
  belongs_to :collection

  validates :domain_name, presence: true, uniqueness: true
end
