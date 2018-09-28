class InstagramPost < ApplicationRecord
  has_and_belongs_to_many :expositions

  validates :url, presence: true, uniqueness: true
end
