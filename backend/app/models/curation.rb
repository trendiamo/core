class Curation < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
  has_many :spotlights, dependent: :destroy
  has_many :triggers, as: :flow, dependent: :destroy

  accepts_nested_attributes_for :spotlights

  validates :name, presence: true
  validates :title, presence: true
  validates :subtitle, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "title", "subtitle", "name", "created_at", "updated_at")
      .merge(persona: { id: persona.id, profile_pic_url: persona.profile_pic_url },
             spotlights_attributes: spotlights_attributes(spotlights),
             type: "Curation")
  end

  def spotlights_attributes(spotlights)
    spotlights.map do |spotlight|
      {
        text: spotlight.text,
        persona_id: spotlight.persona.id,
        product_picks_attributes: product_picks_attributes(spotlight.product_picks),
      }
    end
  end

  def product_picks_attributes(product_picks)
    product_picks.map do |product_pick|
      {
        url: product_pick.url,
        name: product_pick.name,
        description: product_pick.description,
        display_price: product_pick.display_price,
        pic_url: product_pick.pic_url,
      }
    end
  end
end
