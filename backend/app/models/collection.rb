class Collection < ApplicationRecord
  self.inheritance_column = nil # because we're using type, but it's for our own purposes

  has_one :collection_modal
  has_one :fenced_collection

  validates :handle, presence: true, uniqueness: true
  validates :title, presence: true
  validates :type, inclusion: { in: %w[brand influencer] }
  validates :profile_pic_url, presence: true
  validates :cover_pic_url, presence: true
  validates :description, presence: true
end
