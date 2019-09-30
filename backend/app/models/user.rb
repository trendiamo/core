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
  has_many :orders, dependent: :destroy, foreign_key: "seller_id", inverse_of: "seller"

  has_many :invites, dependent: :destroy, class_name: "Invite", foreign_key: "recipient_id", inverse_of: "recipient"
  has_many :sent_invites, dependent: :destroy, class_name: "Invite", foreign_key: "sender_id", inverse_of: "sender"

  has_one :image, dependent: :destroy

  accepts_nested_attributes_for :memberships

  before_validation :set_referral_code, on: :create

  validate :memberships_empty_when_admin
  validate :referred_by_code_exists
  validates :social_media_url, presence: true, unless: :not_affiliate?
  validates :bio, :img_url, presence: true, if: :seller?
  validates :referral_code, presence: true, uniqueness: true
  validates :currency, presence: true, inclusion: { in: %w[eur gbp chf usd] }

  def as_json(options = {})
    sliced_attributes = attributes
                        .slice("id", "email", "first_name", "last_name", "onboarding_stage", "admin", "img_rect",
                               "affiliate_role", "referral_code", "requested_upgrade_to_seller_at", "currency",
                               "social_media_url", "bio", "stripe_user_id", "created_at", "updated_at")
                        .merge(name: name, img: { url: img_url })
    attributes_with_roles = admin? ? sliced_attributes : sliced_attributes.merge(roles: mapped_roles)
    options[:details] ? attributes_with_roles.merge(details_attributes) : attributes_with_roles
  end

  def memberships_empty_when_admin
    errors.add(:memberships, "must be empty when user is an admin") if !memberships.empty? && admin?
  end

  def referred_by_code_exists
    return if referred_by_code.blank? || User.where(referral_code: referred_by_code).exists?

    errors.add(:referred_by_code, "is not valid")
  end

  def name
    first_name && last_name && "#{first_name} #{last_name}" || first_name || last_name || email
  end

  def mapped_roles
    Hash[memberships.map { |membership| [membership.account.slug, membership.role] }]
  end

  def active_membership
    memberships.find_by(account: ActsAsTenant.current_tenant)
  end

  def details_attributes
    attributes.slice(
      "date_of_birth", "shipping_first_name", "shipping_last_name",
      "address_line1", "address_line2", "zip_code", "city",
      "country", "payment_first_name", "payment_last_name", "photo_id_front_url", "photo_id_back_url",
      "payment_address", "phone_number", "iban"
    )
  end

  def set_referral_code
    self.referral_code = User.generate_readable_random_code
  end

  def self.generate_readable_random_code(size = 9)
    charset = %w[2 3 4 6 7 9 A C D E F G H J K M N P Q R T V W X Y Z]
    (0...size).map { charset.to_a[SecureRandom.random_number(charset.length)] }.join
  end
end
