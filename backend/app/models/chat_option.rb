class ChatOption < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step
  belongs_to :destination_chat_step, foreign_key: "destination_chat_step_id", class_name: "ChatStep", optional: true

  accepts_nested_attributes_for :destination_chat_step, allow_destroy: true

  validates :text, presence: true
  validate :action_type_and_destination_step

  before_create :assign_order

  enum action_type: %i[simple reset stop]

  def as_json(options = {})
    result = attributes.slice("id", "text", "destination_chat_step_id", "action_type", "created_at", "updated_at")
    chat_step_ids = options[:chat_step_ids] || []
    unless chat_step_ids.include?(destination_chat_step_id)
      result[:destination_chat_step_attributes] = destination_chat_step.as_json(options)
    end
    result
  end

  def assign_order
    current_value = self.class.where(chat_step_id: chat_step_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end

  def action_type_and_destination_step
    errors.add(:destination_chat_step, "should exist") if action_type == "simple" &&
                                                          destination_chat_step.nil?
  end
end
