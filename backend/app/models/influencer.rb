class Influencer < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :profile_pic_url, presence: true
end
