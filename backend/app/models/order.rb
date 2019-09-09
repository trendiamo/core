class Order < ApplicationRecord
  belongs_to :account
  belongs_to :seller, class_name: "User", foreign_key: "seller_id", inverse_of: "orders"

  validates :captured_at, presence: true
  validates :commission_rate, presence: true
  validates :amount_in_cents, presence: true
  validates :seller_id, presence: true
  validates :currency, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "captured_at", "commission_rate", "products")
  end
end
