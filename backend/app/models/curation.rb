class Curation < ApplicationRecord
  acts_as_tenant
  belongs_to :persona

  def as_json(_options = {})
    attributes
      .slice("id", "title", "subtitle", "created_at", "updated_at")
      .merge(persona: { profile_pic_url: persona.profile_pic_url })
  end
end
