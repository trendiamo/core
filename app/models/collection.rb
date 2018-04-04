class Collection < ApplicationRecord
  self.inheritance_column = nil

  validates :handle, presence: true, uniqueness: true
  validates :title, presence: true
  validates :type, inclusion: { in: %w[brand influencer] }
  validates :profile_pic_url, presence: true
  validates :cover_pic_url, presence: true
  validates :description, presence: true
end
