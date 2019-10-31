class ImpactPointsTransaction < ApplicationRecord
  belongs_to :user

  validates :transaction_type, presence: true, inclusion: { in: %w[deposit withdrawal] }
  validates :amount_in_cents, presence: true, numericality: { other_than: 0 }
  validates :old_balance_in_cents, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :new_balance_in_cents, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
