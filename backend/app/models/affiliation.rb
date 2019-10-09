class Affiliation < ApplicationRecord
  before_validation :generate_token, on: :create

  belongs_to :account
  belongs_to :user
  has_many :affiliate_links, dependent: :destroy

  validates :token, uniqueness: { scope: :account }
  validate :account_must_be_affiliate
  validate :non_affiliate_users_cannot_have_affiliations
  validate :one_affiliation_per_account

  before_create :build_default_affiliate_link

  def as_json(_options = {})
    attributes.slice("id", "token")
              .merge(brand: account.brand, default_affiliate_link: affiliate_links.find_by(default_link: true).url)
  end

  private

  def generate_token
    self.token = SecureRandom.hex(4)
  end

  def account_must_be_affiliate
    return if !account || account.is_affiliate

    errors.add(:account, "is not an affiliate")
  end

  def non_affiliate_users_cannot_have_affiliations
    return if !user || user.affiliate_role != "not_affiliate"

    errors.add(:user, "is not an affiliate")
  end

  def one_affiliation_per_account
    return unless Affiliation.where(user: user, account: account).where.not(id: id).any?

    errors.add(:user, "can only have one affiliation per account")
  end

  def build_default_affiliate_link
    affiliate_links.build(default_link: true, url: "https://#{account.websites.first.hostnames.first}/?aftk=#{token}")
  end
end
