class ChatMessage < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step

  validates :text, presence: true

  before_create :update_order

  def as_json(_options = {})
    attributes.slice("id", "delay", "text", "created_at", "updated_at")
  end

  def delay
    # in miliseconds
    [800, 120 + text.length * 2].min
  end

  def update_order
    return if self.class.where(chat_step_id: chat_step_id).empty?
    self.order = self.class.where(chat_step_id: chat_step_id).order(:order).pluck(:order).last + 1
  end
end
