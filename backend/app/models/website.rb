class Website < ApplicationRecord
  acts_as_tenant

  belongs_to :account

  validates :name, presence: true, uniqueness: true
  validates :title, presence: true
  validates :hostnames, presence: true
end
