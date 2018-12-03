class ChatOption < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step
  belongs_to :destination_chat_step, foreign_key: "destinaton_chat_step_id", class_name: "ChatStep"

  accepts_nested_attributes_for :destination_chat_step

  validates :text, presence: true
end
