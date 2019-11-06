class ImpactReward < ApplicationRecord
  belongs_to :brand

  validates :target_revenue_in_cents, presence: true, numericality: { greater_than: 0 }
  validates :impact_points_in_cents, presence: true, numericality: { greater_than: 0 }
  validates :target_revenue_currency, presence: true, inclusion: { in: %w[eur gbp chf usd] }

  def as_json(_options = {})
    attributes.slice("id", "target_revenue_currency", "target_revenue_in_cents", "impact_points_in_cents")
  end
end
