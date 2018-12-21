class ChatOption < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step
  belongs_to :destination_chat_step, foreign_key: "destination_chat_step_id", class_name: "ChatStep"

  accepts_nested_attributes_for :destination_chat_step, allow_destroy: true

  validates :text, presence: true

  def as_json(options = {})
    result = attributes.slice("id", "text", "destination_chat_step_id", "created_at", "updated_at")
    chat_step_ids = options[:chat_step_ids] || []
    unless chat_step_ids.include?(destination_chat_step_id)
      result[:destination_chat_step_attributes] = destination_chat_step.as_json(options)
    end
    result
  end
end
