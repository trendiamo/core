class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  belongs_to :account, optional: true
  has_many :generated_urls, dependent: :destroy

  has_many :outros, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :showcases, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :simple_chats, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"

  validates :account, presence: true, unless: :admin?
  validate :account_set

  enum role: %i[owner editor]

  def as_json(_options = {})
    sliced_attributes = attributes
                        .slice("id", "email", "first_name", "last_name", "profile_pic_url", "onboarding_stage", "admin",
                               "role", "created_at", "updated_at")
    admin? ? sliced_attributes : sliced_attributes.merge(account: { website_ids: account.website_ids })
  end

  def account_set
    errors.add(:admin, "must be false when account field is set") if !account.nil? && admin?
  end
end
