class Account < ApplicationRecord
  has_many :users
  has_one :website
  has_many :influencers
end
