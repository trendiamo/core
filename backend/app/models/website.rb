class Website < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :title, presence: true
  validates :hostnames, presence: true
end
