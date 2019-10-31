class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:google_oauth2]

  enum affiliate_role: %i[not_affiliate promoter seller]

  has_many :generated_urls, dependent: :destroy

  has_many :login_events, dependent: :destroy

  has_many :outros, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :showcases, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"
  has_many :simple_chats, dependent: :destroy, foreign_key: "owner_id", inverse_of: "owner"

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :memberships, dependent: :destroy
  has_many :accounts, through: :memberships

  has_many :affiliations, dependent: :destroy
  has_many :interests, dependent: :destroy
  has_many :orders, dependent: :destroy, foreign_key: "seller_id", inverse_of: "seller"

  has_many :invites, dependent: :destroy, class_name: "Invite", foreign_key: "recipient_id", inverse_of: "recipient"
  has_many :sent_invites, dependent: :destroy, class_name: "Invite", foreign_key: "sender_id", inverse_of: "sender"

  has_many :impact_points_transactions, dependent: :destroy

  has_one :image, dependent: :destroy

  accepts_nested_attributes_for :memberships

  before_validation :set_referral_code, on: :create

  validate :memberships_empty_when_admin
  validate :referred_by_code_exists
  validates :social_media_url, presence: true, on: :update, unless: :not_affiliate?
  validates :accepted_terms_and_conditions_at, presence: true, on: :update, unless: :not_affiliate?
  validates :bio, :img_url, presence: true, if: :seller?
  validates :referral_code, presence: true, uniqueness: true
  validates :currency, presence: true, inclusion: { in: %w[eur gbp chf usd] }
  validates :impact_points_balance_in_cents, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def as_json(options = {})
    sliced_attributes = attributes
                        .slice("id", "email", "first_name", "last_name", "onboarding_stage", "admin", "img_rect",
                               "affiliate_role", "referral_code", "requested_upgrade_to_seller_at", "currency",
                               "social_media_url", "bio", "impact_points_balance_in_cents", "stripe_user_id",
                               "created_at", "updated_at")
                        .merge(name: name, img: { url: img_url }, product_category_list: tag_list("product_category"),
                               positive_impact_area_list: tag_list("positive_impact_area"))
    attributes_with_roles = admin? ? sliced_attributes : sliced_attributes.merge(roles: mapped_roles)
    options[:details] ? attributes_with_roles.merge(details_attributes) : attributes_with_roles
  end

  def tag_list(tag_type)
    tags.where(tag_type: tag_type).map(&:name)
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
      "shipping_first_name", "shipping_last_name",
      "address_line1", "address_line2", "zip_code", "city", "country"
    )
  end

  def set_referral_code
    self.referral_code = User.generate_readable_random_code
  end

  def self.generate_readable_random_code(size = 9)
    charset = %w[2 3 4 6 7 9 A C D E F G H J K M N P Q R T V W X Y Z]
    (0...size).map { charset.to_a[SecureRandom.random_number(charset.length)] }.join
  end

  def self.from_omniauth(auth) # rubocop:disable Metrics/AbcSize
    where(email: auth.info.email).first_or_create! do |user|
      user.password = Devise.friendly_token[0, 20]
      user.confirmed_at = Time.now.utc
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.img_url = auth.info.image
      user.affiliate_role = 1
    end
  end

  def withdraw_impact_points_in_cents(amount_in_cents)
    ActiveRecord::Base.transaction do
      ImpactPointsTransaction.create!(user_id: id, transaction_type: "withdrawal", amount_in_cents: -amount_in_cents,
                                      old_balance_in_cents: impact_points_balance_in_cents,
                                      new_balance_in_cents: impact_points_balance_in_cents - amount_in_cents)
      update!(impact_points_balance_in_cents: impact_points_balance_in_cents - amount_in_cents)
    end
  end

  def deposit_impact_points_in_cents(amount_in_cents)
    ActiveRecord::Base.transaction do
      ImpactPointsTransaction.create!(user_id: id, transaction_type: "deposit", amount_in_cents: amount_in_cents,
                                      old_balance_in_cents: impact_points_balance_in_cents,
                                      new_balance_in_cents: impact_points_balance_in_cents + amount_in_cents)
      update!(impact_points_balance_in_cents: impact_points_balance_in_cents + amount_in_cents)
    end
  end
end
