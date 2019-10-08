class Interest < ApplicationRecord
  belongs_to :account
  belongs_to :user

  validate :account_must_be_affiliate
  validate :non_affiliate_users_cannot_have_interest

  validates :user, uniqueness: { scope: :account }

  def as_json(_options = {})
    attributes.slice("id").merge(brand: account.brand)
  end

  private

  def account_must_be_affiliate
    return if !account || account.is_affiliate

    errors.add(:account, "is not an affiliate")
  end

  def non_affiliate_users_cannot_have_interest
    return if !user || user.affiliate_role != "not_affiliate"

    errors.add(:user, "is not an affiliate")
  end
end
