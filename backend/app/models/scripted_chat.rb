class ScriptedChat < ApplicationRecord
  acts_as_tenant
  has_one :first_chat_step, foreign_key: "scripted_chat_id", class_name: "ChatStep"

  validates :title, presence: true
end
