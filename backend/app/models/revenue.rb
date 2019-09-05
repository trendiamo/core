class Revenue < ApplicationRecord
  belongs_to :account
  belongs_to :user

  validates :captured_at, presence: true
  validates :commission_value, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "captured_at", "commission_value")
      .merge(extra_attributes)
  end

  private

  def extra_attributes
    {
      brand_attributes: {
        id: account.brand.id,
        name: account.brand.name,
        description: account.brand.description,
        logoUrl: account.brand.logo_url,
      },
      totals: values.map { |key, value| { currency: key, value: value } },
    }
  end
end
