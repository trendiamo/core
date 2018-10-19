class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  has_many :authentication_tokens, class_name: "AuthToken", dependent: :destroy
  belongs_to :account

  validates :website_ref, uniqueness: true
  acts_as_tenant
end
