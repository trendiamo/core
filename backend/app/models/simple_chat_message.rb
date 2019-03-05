class SimpleChatMessage < ApplicationRecord
  acts_as_tenant
  belongs_to :simple_chat_step

  validates :text, presence: true

  before_create :assign_order

  def as_json(_options = {})
    attributes.slice("id", "text", "order")
  end

  def assign_order
    current_value = self.class.where(simple_chat_step_id: simple_chat_step_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end
end