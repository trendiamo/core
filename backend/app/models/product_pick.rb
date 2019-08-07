class ProductPick < ApplicationRecord
  acts_as_tenant
  belongs_to :spotlight, touch: true
  belongs_to :img, class_name: "Image", touch: true

  before_create :assign_order, unless: :order_changed?

  validates :name, presence: true
  validates :url, presence: true
  validates :description, presence: true

  def assign_order
    current_value = self.class.where(spotlight_id: spotlight_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end

  def as_json(_options = {})
    attributes
      .slice("id", "spotlight_id", "name", "account_id", "url", "description", "display_price", "img_rect",
             "created_at", "updated_at")
      .merge(img: { url: img.url })
      .merge(picture: { url: img.url }, pic_rect: img_rect)
  end
end
