class SimpleChat < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :simple_chat_steps, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy

  accepts_nested_attributes_for :simple_chat_steps, allow_destroy: true

  validates :name, presence: true
  validates :title, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "name", "chat_bubble_text")
      .merge(extra_attributes)
  end

  def paths
    new_step = attributes.slice("id", "name")
    new_step[:path] = "/#{self.class.name.underscore.tr('_', '-')}/#{id}"
    [new_step]
  end

  private

  def extra_attributes
    result = {
      persona: persona_attributes,
      type: "SimpleChat",
      trigger_ids: triggers.ids,
    }
    result[:simple_chat_steps_attributes] = simple_chat_steps.order(:order).map(&:as_json) if simple_chat_steps.any?
    result
  end

  def persona_attributes
    {
      id: persona.id, name: persona.name, profile_pic_url: persona.profile_pic_url,
      instagram_url: persona.instagram_url,
    }
  end
end
