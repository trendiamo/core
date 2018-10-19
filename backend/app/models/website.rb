class Website < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :title, presence: true
  validates :hostnames, presence: true

  belongs_to :account
  acts_as_tenant
end
