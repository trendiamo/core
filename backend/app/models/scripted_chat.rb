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
      .slice("id", "title", "name", "chat_bubble_text", "created_at", "updated_at")
      .merge(extra_attributes)
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  private

  def extra_attributes
    result = {
      persona: {
        id: persona.id, name: persona.name, profile_pic_url: persona.profile_pic_url,
        instagram_url: persona.instagram_url,
      },
      type: "ScriptedChat",
      trigger_ids: triggers.ids,
    }
    result[:chat_step_attributes] = chat_step.as_json if chat_step
    result
  end
end
