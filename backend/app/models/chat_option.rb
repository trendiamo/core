class ChatOption < ApplicationRecord
  belongs_to :chat_step

  validates :text, presence: true
  validate :chat_step_cannot_equal_next

  private

  def chat_step_cannot_equal_next
    errors.add(:chat_steps, "chat step cannot be the same as destination chat step") if chat_step_id == destinaton_chat_step_id
  end
end
