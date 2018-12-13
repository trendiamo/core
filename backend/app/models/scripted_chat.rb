class ScriptedChat < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_one :chat_step, foreign_key: "scripted_chat_id", class_name: "ChatStep", dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy

  accepts_nested_attributes_for :chat_step

  validates :name, presence: true
  validates :title, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "name", "created_at", "updated_at")
      .merge(extra_attributes)
  end

  def extra_attributes
    {
      persona: {
        id: persona.id, name: persona.name, profile_pic_url: persona.profile_pic_url,
      },
      chat_step_attributes: chat_step_attributes(chat_step),
      type: "ScriptedChat",
    }
  end

  def chat_step_attributes(chat_step)
    if chat_step
      {
        id: chat_step.id,
        chat_messages_attributes: chat_messages_attributes(chat_step),
        chat_options_attributes: chat_options_attributes(chat_step),
      }
    else
      {}
    end
  end

  def chat_messages_attributes(chat_step)
    return [{ id: chat_step, delay: "", text: "" }] if chat_step.nil? || chat_step.chat_messages.empty?
    chat_step.chat_messages.map do |chat_message|
      {
        id: chat_message.id || "",
        delay: chat_message.delay || "",
        text: chat_message.text || "",
      }
    end
  end

  def destination_chat_step_attributes(chat_step, chat_option)
    {
      id: chat_option.destination_chat_step_id,
      chat_messages_attributes: chat_messages_attributes(chat_option.destination_chat_step),
      chat_options_attributes: if chat_step.id == chat_option.destination_chat_step_id
                                 []
                               else
                                 chat_options_attributes(chat_option.destination_chat_step)
                               end,
    }
  end

  def chat_options_attributes(chat_step)
    return [{ id: "", text: "", destination_chat_step_id: "" }] if chat_step.nil? || chat_step.chat_options.empty?
    chat_step.chat_options.map do |chat_option|
      {
        id: chat_option.id || "",
        text: chat_option.text || "",
        destination_chat_step_id: chat_option.destination_chat_step_id || "",
        destination_chat_step_attributes: destination_chat_step_attributes(chat_step, chat_option),
      }
    end
  end
end
