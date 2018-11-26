class Account < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :websites, dependent: :destroy
  has_many :personas, dependent: :destroy
end
