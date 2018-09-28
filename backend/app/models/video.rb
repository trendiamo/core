class Video < ApplicationRecord
  has_and_belongs_to_many :expositions
  
  validates :video_url, presence: true
end
