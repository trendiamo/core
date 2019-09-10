class Brand < ApplicationRecord
  acts_as_tenant
  belongs_to :account
  has_many :affiliations, through: :account

  validates :name, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "full_description", "logo_url", "header_image_url", "commission_rate",
             "commission_description", "terms_and_conditions", "instagram_url", "facebook_url", "twitter_url", "tags",
             "created_at", "updated_at", "lock_version")
      .merge(account_id: account.id, affiliations: affiliations,
             website_hostname: account.websites.first.hostnames.first)
  end
end
