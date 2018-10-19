class Account < ApplicationRecord
  has_many :users
  has_one :website
end
