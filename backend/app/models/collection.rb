class Collection < ApplicationRecord
  self.inheritance_column = nil # because we're using type, but it's for our own purposes

  has_one :collection_modal, dependent: :destroy
  has_one :fenced_collection, dependent: :destroy

  accepts_nested_attributes_for :collection_modal, allow_destroy: true
  accepts_nested_attributes_for :fenced_collection, allow_destroy: true

  validates :handle, presence: true, uniqueness: true, format: { with: /[a-zA-Z-]+/ }
  validates :title, presence: true
  validates :type, inclusion: { in: %w[brand influencer] }
  validates :profile_pic_url, presence: true
  validates :cover_pic_url, presence: true
  validates :description, presence: true
end
