class CollectionModal < ApplicationRecord
  belongs_to :collection

  validates :logo_pic_url, presence: true
  validates :cover_pic_url, presence: true
  validates :title, presence: true
  validates :text, presence: true
  validates :cta_text, presence: true
end
