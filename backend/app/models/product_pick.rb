class ProductPick < ApplicationRecord
  acts_as_tenant
  belongs_to :spotlight

  before_create :update_order

  def update_order
    return if self.class.where(spotlight_id: spotlight_id).empty?
    self.order = self.class.where(spotlight_id: spotlight_id).order(:order).pluck(:order).last + 1
  end
end
