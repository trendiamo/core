class Navigation < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy
  has_many :navigation_items, dependent: :destroy

  accepts_nested_attributes_for :navigation_items, allow_destroy: true

  validates :name, presence: true
  def as_json(_options = {})
    attributes
      .slice("id", "name", "created_at", "updated_at")
      .merge(extra_attributes)
  end

  def extra_attributes
    {
      persona: { id: persona.id, profile_pic_url: persona.profile_pic_url, name: persona.name,
                 description: persona.description, },
      navigation_items_attributes: navigation_items.map(&:as_json),
      type: "Navigation",
      trigger_ids: triggers.ids,
    }
  end
end
