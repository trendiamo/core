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

  private

  def extra_attributes
    result = {
      persona: {
        id: persona.id, name: persona.name, profile_pic_url: persona.profile_pic_url,
      },
      type: "ScriptedChat",
    }
    result[:chat_step_attributes] = chat_step.as_json if chat_step
    result
  end
end
