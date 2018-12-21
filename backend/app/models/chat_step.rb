class ChatStep < ApplicationRecord
  acts_as_tenant
  belongs_to :scripted_chat, optional: true
  has_many :chat_messages, dependent: :destroy
  has_many :chat_options, dependent: :destroy
  has_many :refering_chat_options, foreign_key: "destination_chat_step_id", class_name: "ChatOption"

  accepts_nested_attributes_for :chat_messages, allow_destroy: true
  accepts_nested_attributes_for :chat_options, allow_destroy: true

  def as_json(options = {})
    {
      id: id,
      chat_messages_attributes: chat_messages.map(&:as_json),
      chat_options_attributes: chat_options_attributes(options[:chat_step_ids]),
    }
  end

  private

  def chat_options_attributes(chat_step_ids)
    chat_options.map do |chat_option|
      chat_option.as_json(chat_step_ids: (chat_step_ids || []) | [id])
    end
  end
end
