class ChatMessage < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step

  validates :text, presence: true
end
