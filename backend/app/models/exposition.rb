class Exposition < ApplicationRecord
  belongs_to :influencer
  has_and_belongs_to_many :videos
  has_and_belongs_to_many :instagram_posts

  validates :domain, presence: true, uniqueness: true
  validates :cta_text, presence: true
  validates :cta_url, presence: true
end
