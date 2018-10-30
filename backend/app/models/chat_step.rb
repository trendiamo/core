class ChatStep < ApplicationRecord
  has_many :chat_messages
  has_many :chat_options
  has_many :refering_chat_options, foreign_key: "destinaton_chat_step_id", class_name: "ChatOption"
  belongs_to :chat
end
