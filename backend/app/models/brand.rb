class Brand < ApplicationRecord
  acts_as_tenant
  belongs_to :account

  validates :name, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "full_description", "logo_url", "header_image_url", "commission_value",
             "commission_description", "terms_and_conditions", "instagram_url", "facebook_url", "twitter_url",
             "created_at", "updated_at", "lock_version")
      .merge(website_hostname: account.websites.first.hostnames.first)
  end
end
