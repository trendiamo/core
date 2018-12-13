class Spotlight < ApplicationRecord
  acts_as_tenant
  belongs_to :curation
  belongs_to :persona
  has_many :product_picks, dependent: :destroy

  accepts_nested_attributes_for :product_picks, allow_destroy: true
end
