class ChatMessage < ApplicationRecord
  belongs_to :chat_step

  validates :text, prescence: true
end
