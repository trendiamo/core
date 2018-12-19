class NavigationItem < ApplicationRecord
  acts_as_tenant
  belongs_to :navigation

  validates :text, presence: true
  validates :url, presence: true
  validates :pic_url, presence: true

  def as_json(_options = {})
    { id: id, text: text, url: url, pic_url: pic_url }
  end
end
