class NavigationItem < ApplicationRecord
  acts_as_tenant
  belongs_to :navigation
  belongs_to :pic, class_name: "Picture"

  validates :text, presence: true
  validates :url, presence: true

  before_create :assign_order, unless: :order_changed?

  def pic_url
    pic.url
  end

  def as_json(_options = {})
    { id: id, text: text, url: url, pic_url: pic_url }
  end

  def assign_order
    current_value = self.class.where(navigation_id: navigation_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end
end
