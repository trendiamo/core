class SimpleChatMessage < ApplicationRecord
  acts_as_tenant :account, optional: true
  belongs_to :simple_chat_section

  before_create :assign_order, unless: :order_changed?

  def as_json(_options = {})
    attributes.slice("id", "order", "type")
  end

  def assign_order
    current_value = self.class.where(simple_chat_section_id: simple_chat_section_id).order(:order).pluck(:order).last
    self.order = (current_value || 0) + 1
  end
end
