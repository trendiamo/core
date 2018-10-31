class ChatOption < ApplicationRecord
  belongs_to :chat_step

  validates :text, presence: true
  validate :chat_step_cannot_equal_destion

  private

  def chat_step_cannot_equal_destination
    chat_step_valid = chat_step_id == destinaton_chat_step_id
    unless chat_step_valid errors.add(:chat_steps, "chat step cannot be the same as destination chat step")
    end
  end
end
