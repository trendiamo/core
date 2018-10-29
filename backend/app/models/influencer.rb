class Influencer < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  belongs_to :account

  validates :name, presence: true
  validates :description, presence: true
  validates :profile_pic_url, presence: true
end
