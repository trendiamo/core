class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  has_many :authentication_tokens, class_name: "AuthToken", dependent: :destroy
  has_one :brand

  validates :website_ref, uniqueness: true
end
