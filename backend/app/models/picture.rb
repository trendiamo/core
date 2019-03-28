class Picture < ApplicationRecord
  acts_as_tenant
  belongs_to :account

  validates :url, presence: true
end
