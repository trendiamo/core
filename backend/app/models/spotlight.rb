class Spotlight < ApplicationRecord
  acts_as_tenant
  belongs_to :showcase, touch: true
  belongs_to :seller
  has_many :product_picks, dependent: :destroy

  validates :product_picks, presence: true

  accepts_nested_attributes_for :product_picks, allow_destroy: true

  before_create :assign_order, unless: :order_changed?

  def paths(spotlight_index)
    new_step = attributes.slice("id", "name")
    new_step[:name] = "#{showcase.name}: Spotlight ##{spotlight_index}"
    new_step[:path] = "/showcase/#{showcase.id}/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  def assign_order
    current_value = self.class.where(showcase_id: showcase_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end
end
