class Outro < ApplicationRecord
  acts_as_tenant

  belongs_to :persona
  belongs_to :account

  def as_json(_options = {})
    attributes
      .slice("id", "created_at", "updated_at")
      .merge(persona: { profile_pic_url: persona.profile_pic_url })
  end
end
