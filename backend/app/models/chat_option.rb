class ChatOption < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step
  has_one :destination_chat_step, foreign_key: "refering_chat_option_id", class_name: "ChatStep"

  validates :text, presence: true
end
