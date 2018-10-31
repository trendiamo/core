class ChatMessage < ApplicationRecord
  belongs_to :chat_step

  validates :text, presence: true
end
