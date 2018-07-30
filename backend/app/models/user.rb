class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable

  has_many :authentication_tokens, class_name: "AuthToken", dependent: :destroy

  validates :username, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9_\.]+\Z/ }

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    login = conditions.delete(:email)
    return unless login
    where(conditions.to_h).where(["lower(username) = :v OR lower(email) = :v", v: login.downcase]).first
  end
end
