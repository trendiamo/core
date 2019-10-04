class LoginEvent < ApplicationRecord
  belongs_to :user

  validates :timestamp, presence: true
  validates :domain, presence: true
end
