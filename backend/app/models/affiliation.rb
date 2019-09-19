class Affiliation < ApplicationRecord
  before_validation :generate_token, on: :create

  belongs_to :account
  belongs_to :user

  validates :token, uniqueness: { scope: :account }
  validate :account_must_be_affiliate
  validate :non_affiliate_users_cannot_have_affiliations
  validate :one_affiliation_per_account

  def as_json(_options = {})
    attributes.slice("id", "token")
              .merge(brand: account.brand, has_revenues: account.orders.length.positive?)
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
    return if user&.affiliate_role_changed? && !user_id_changed? && !account_id_changed?
    return unless Affiliation.where(user: user, account: account).any?

    errors.add(:user, "can only have one affiliation per account")
  end
end
