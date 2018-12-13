class ChatStep < ApplicationRecord
  acts_as_tenant
  belongs_to :scripted_chat, optional: true
  has_many :chat_messages, dependent: :destroy
  has_many :chat_options, dependent: :destroy
  has_many :refering_chat_options, foreign_key: "destination_chat_step_id", class_name: "ChatOption"

  accepts_nested_attributes_for :chat_messages, allow_destroy: true
  accepts_nested_attributes_for :chat_options, allow_destroy: true
end
