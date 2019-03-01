class Outro < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy

  validates :name, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "chat_bubble_text", "chat_bubble_extra_text", "created_at", "updated_at")
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
