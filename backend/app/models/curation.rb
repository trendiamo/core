class Curation < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :spotlights, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy

  accepts_nested_attributes_for :spotlights, allow_destroy: true

  validates :name, presence: true
  validates :title, presence: true
  validates :subtitle, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "subtitle", "name", "created_at", "updated_at")
      .merge(persona: { id: persona.id, profile_pic_url: persona.profile_pic_url, name: persona.name },
             spotlights_attributes: spotlights_attributes(spotlights),
             type: "Curation", label: name)
  end

  def spotlights_attributes(spotlights)
    spotlights.map do |spotlight|
      {
        id: spotlight.id,
        text: spotlight.text,
        persona: { id: spotlight.persona.id, name: spotlight.persona.name },
        product_picks_attributes: product_picks_attributes(spotlight.product_picks),
      }
    end
  end

  def product_picks_attributes(product_picks)
    product_picks.map do |product_pick|
      {
        id: product_pick.id,
        url: product_pick.url,
        name: product_pick.name,
        description: product_pick.description,
        display_price: product_pick.display_price,
        pic_url: product_pick.pic_url,
      }
    end
  end
end
