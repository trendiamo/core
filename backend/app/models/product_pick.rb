class ProductPick < ApplicationRecord
  acts_as_tenant
  belongs_to :spotlight
  belongs_to :pic, class_name: "Picture"

  before_create :assign_order

  def assign_order
    current_value = self.class.where(spotlight_id: spotlight_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end
end
