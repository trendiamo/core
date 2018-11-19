class Account < ApplicationRecord
  has_many :users
  has_many :websites
  has_many :personas
end
