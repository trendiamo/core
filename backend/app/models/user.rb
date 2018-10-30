class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  acts_as_tenant

  has_many :authentication_tokens, class_name: "AuthToken", dependent: :destroy
  belongs_to :account

  validates :website_ref, uniqueness: true

  def as_json(_options = {})
    attributes.slice("id", "email", "first_name", "last_name", "profile_pic_url", "created_at", "updated_at")
  end
end
