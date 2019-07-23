class Outro < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow

  validates :owner_id, presence: true
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", inverse_of: "outros"

  validates :name, presence: true
  validates :chat_bubble_text, presence: true
  validates :chat_bubble_button_no, presence: true
  validates :chat_bubble_button_yes, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "chat_bubble_text", "chat_bubble_button_no", "chat_bubble_button_yes",
             "use_persona_animation", "created_at", "updated_at", "lock_version")
      .merge(persona: persona_attributes(persona), type: "Outro", trigger_ids: triggers.ids)
  end

  def persona_attributes(persona)
    { id: persona.id, name: persona.name, profile_pic: { url: persona.profile_pic.url }, pic_rect: persona.pic_rect,
      profile_pic_animation: { url: persona.profile_pic_animation&.url }, instagram_url: persona.instagram_url, }
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end
end
