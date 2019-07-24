class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  has_many :generated_urls, dependent: :destroy

  has_many :outros, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :showcases, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :simple_chats, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"

  has_many :memberships, dependent: :destroy
  has_many :accounts, through: :memberships

  has_many :invites, dependent: :destroy, class_name: "Invite", foreign_key: "recipient_id", inverse_of: "recipient"
  has_many :sent_invites, dependent: :destroy, class_name: "Invite", foreign_key: "sender_id", inverse_of: "sender"

  accepts_nested_attributes_for :memberships

  validate :memberships_empty_when_admin

  def as_json(_options = {})
    sliced_attributes = attributes
                        .slice("id", "email", "first_name", "last_name", "profile_pic_url", "onboarding_stage", "admin",
                               "pic_rect", "created_at", "updated_at")
    admin? ? sliced_attributes : sliced_attributes.merge(roles: mapped_roles)
  end

  def memberships_empty_when_admin
    errors.add(:memberships, "must be empty when user is an admin") if !memberships.empty? && admin?
  end

  def mapped_roles
    Hash[memberships.map { |membership| [membership.account.slug, membership.role] }]
  end

  def active_membership
    memberships.find_by(account: ActsAsTenant.current_tenant)
  end
end
