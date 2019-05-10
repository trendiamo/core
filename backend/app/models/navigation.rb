class Navigation < ApplicationRecord
  acts_as_tenant

  belongs_to :persona
  has_many :triggers, as: :flow, dependent: :destroy, inverse_of: :flow
  has_many :navigation_items, dependent: :destroy

  accepts_nested_attributes_for :navigation_items, allow_destroy: true

  validates :name, presence: true
  validates :persona, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "title", "chat_bubble_text", "chat_bubble_extra_text", "created_at", "updated_at",
             "lock_version")
      .merge(extra_attributes)
  end

  def extra_attributes
    {
      persona: { id: persona.id, profile_pic_url: persona.profile_pic_url, name: persona.name,
                 description: persona.description, instagram_url: persona.instagram_url, },
      navigation_items_attributes: navigation_items_attributes,
      type: "Navigation",
      trigger_ids: triggers.ids,
    }
  end

  def navigation_items_attributes
    navigation_items.order(:order).map(&:as_json)
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end
end
