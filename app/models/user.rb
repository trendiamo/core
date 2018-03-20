class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  has_many :authentication_tokens, class_name: "AuthToken", dependent: :destroy

  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\Z/ }
end
