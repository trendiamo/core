class ChatMessage < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step

  validates :text, presence: true

  before_create :assign_order

  def as_json(_options = {})
    attributes.slice("id", "delay", "text", "created_at", "updated_at")
  end

  def delay
    # in miliseconds
    [800, 120 + text.length * 2].min
  end

  def assign_order
    current_value = self.class.where(chat_step_id: chat_step_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end
end
