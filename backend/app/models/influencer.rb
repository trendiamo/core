class Influencer < ApplicationRecord
  has_many :expositions

  validates :name, presence: true
  validates :profile_pic, presence: true
end
