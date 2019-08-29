class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  enum affiliate_role: %i[not_affiliate promoter seller]

  has_many :generated_urls, dependent: :destroy

  has_many :outros, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :showcases, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :simple_chats, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"

  has_many :memberships, dependent: :destroy
  has_many :accounts, through: :memberships

  has_many :affiliations, dependent: :destroy

  has_many :invites, dependent: :destroy, class_name: "Invite", foreign_key: "recipient_id", inverse_of: "recipient"
  has_many :sent_invites, dependent: :destroy, class_name: "Invite", foreign_key: "sender_id", inverse_of: "sender"

  has_one :image, dependent: :destroy

  accepts_nested_attributes_for :memberships

  before_validation :set_referral_code, on: :create

  validate :memberships_empty_when_admin
  validate :referred_by_code_exists
  validates :social_media_url, presence: true, unless: :not_affiliate?
  validates :referral_code, presence: true, uniqueness: true

  def as_json(_options = {})
    sliced_attributes = attributes
                        .slice("id", "email", "first_name", "last_name", "img_url", "onboarding_stage", "admin",
                               "img_rect", "affiliate_role", "referral_code", "requested_upgrade_to_seller_at",
                               "created_at", "updated_at")
    admin? ? sliced_attributes : sliced_attributes.merge(roles: mapped_roles)
  end

  def memberships_empty_when_admin
    errors.add(:memberships, "must be empty when user is an admin") if !memberships.empty? && admin?
  end

  def referred_by_code_exists
    return if referred_by_code.blank? || User.where(referral_code: referred_by_code).exists?

    errors.add(:referred_by_code, "is not valid")
  end

  def mapped_roles
    Hash[memberships.map { |membership| [membership.account.slug, membership.role] }]
  end

  def active_membership
    memberships.find_by(account: ActsAsTenant.current_tenant)
  end

  def set_referral_code
    self.referral_code = User.generate_readable_random_code
  end

  def self.generate_readable_random_code(size = 9)
    charset = %w[2 3 4 6 7 9 A C D E F G H J K M N P Q R T V W X Y Z]
    (0...size).map { charset.to_a[SecureRandom.random_number(charset.length)] }.join
  end
end
