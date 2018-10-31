class ChatStep < ApplicationRecord
  belongs_to :chat
  belongs_to :chat_option
  has_many :chat_messages
  has_many :chat_options
  has_many :refering_chat_options, foreign_key: "destinaton_chat_step_id", class_name: "ChatOption"
end
