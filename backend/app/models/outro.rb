class Outro < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy

  def as_json(_options = {})
    attributes
      .slice("id", "name", "created_at", "updated_at")
      .merge(persona: { id: persona.id, profile_pic_url: persona.profile_pic_url, name: persona.name })
  end
end
