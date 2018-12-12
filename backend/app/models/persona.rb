class Persona < ApplicationRecord
  include CleanupAssets

  acts_as_tenant

  paginates_per 10

  has_many :curations, dependent: :destroy
  has_many :scripted_chats, dependent: :destroy
  has_many :outros, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :profile_pic_url, presence: true
end
