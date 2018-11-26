class ScriptedChat < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_one :first_chat_step, foreign_key: "scripted_chat_id", class_name: "ChatStep"

  validates :title, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "created_at", "updated_at")
      .merge(persona: { profile_pic_url: persona.profile_pic_url })
  end
end
