class AffiliateLink < ApplicationRecord
  belongs_to :affiliation

  validates :url, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes.slice("id", "url")
  end
end
