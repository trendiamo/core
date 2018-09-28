class Exposition < ApplicationRecord
  belongs_to :influencer
  has_and_belongs_to_many :videos
  has_and_belongs_to_many :instagram_posts
end
