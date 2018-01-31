class Influencer < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  has_many :authentication_tokens, class_name: "InfluencerAuthToken"
end
