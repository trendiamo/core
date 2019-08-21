class Invite < ApplicationRecord
  has_secure_token :token
  acts_as_tenant
  belongs_to :account
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User", optional: true

  validates :sender_id, presence: true
  validates :role, inclusion: { in: %w[owner editor promoter] }
  validates :email, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "email", "sender_id", "recipient_id", "account_id", "created_at", "updated_at", "lock_version")
  end

  def accepted_and_confirmed?
    accepted_at? && recipient&.confirmed?
  end

  def invite_due_at
    created_at + 2.weeks
  end

  def invite_period_valid?
    invite_due_at > Time.now.utc
  end

  def deliver_invite
    DeviseSparkpostMailer.invite(self, token).deliver
    self
  end
end
