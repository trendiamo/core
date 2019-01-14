class Spotlight < ApplicationRecord
  acts_as_tenant
  belongs_to :showcase
  belongs_to :persona
  has_many :product_picks, dependent: :destroy

  accepts_nested_attributes_for :product_picks, allow_destroy: true

  before_create :update_order

  def paths(spotlight_index)
    new_step = attributes.slice("id", "name")
    new_step[:name] = "#{showcase.name}: Spotlight ##{spotlight_index}"
    new_step[:path] = "/showcase/#{showcase.id}/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  def update_order
    return if self.class.where(showcase_id: showcase_id).empty?
    self.order = self.class.where(showcase_id: showcase_id).order(:order).pluck(:order).last + 1
  end
end
