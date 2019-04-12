class ProductPick < ApplicationRecord
  acts_as_tenant
  belongs_to :spotlight
  belongs_to :pic, class_name: "Picture"

  before_create :assign_order, unless: :order_changed?

  def assign_order
    current_value = self.class.where(spotlight_id: spotlight_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end

  def pic_url
    pic.url
  end

  def as_json(_options = {})
    attributes
      .slice("id", "spotlight_id", "name", "account_id", "url", "description", "display_price",
             "created_at", "updated_at")
      .merge(pic_url: pic_url)
  end
end
