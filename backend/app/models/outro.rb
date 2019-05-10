class Outro < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :name, presence: true
  validates :chat_bubble_text, presence: true
  validates :chat_bubble_button_no, presence: true
  validates :chat_bubble_button_yes, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "chat_bubble_text", "chat_bubble_button_no", "chat_bubble_button_yes", "created_at",
             "updated_at", "lock_version")
      .merge(persona: { id: persona.id, profile_pic_url: persona.profile_pic_url, name: persona.name,
                        instagram_url: persona.instagram_url, },
             type: "Outro",
             trigger_ids: triggers.ids)
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end
end
