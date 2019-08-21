class Membership < ApplicationRecord
  belongs_to :account
  belongs_to :user

  enum role: %i[owner editor promoter]

  accepts_nested_attributes_for :account

  validate :one_membership_per_account
  validate :admins_cannot_have_memberships

  def as_json(_options = {})
    attributes
      .slice("id", "role")
  end

  def one_membership_per_account
    return if role_changed? && !user_id_changed? && !account_id_changed?
    return unless Membership.where(user: user, account: account).any?

    errors.add(:user, "can only have one membership per account")
  end

  def admins_cannot_have_memberships
    return unless user&.admin

    errors.add(:user, "cannot be admin and have memberships")
  end
end
