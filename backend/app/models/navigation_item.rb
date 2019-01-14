class NavigationItem < ApplicationRecord
  acts_as_tenant
  belongs_to :navigation

  validates :text, presence: true
  validates :url, presence: true
  validates :pic_url, presence: true

  before_create :update_order

  def as_json(_options = {})
    { id: id, text: text, url: url, pic_url: pic_url }
  end

  def update_order
    return if self.class.where(navigation_id: navigation_id).empty?
    self.order = self.class.where(navigation_id: navigation_id).order(:order).pluck(:order).last + 1
  end
end
