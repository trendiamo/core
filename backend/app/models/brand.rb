class Brand < ApplicationRecord
  acts_as_tenant
  belongs_to :account
  has_many :affiliations, through: :account
  has_many :simple_chats, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :impact_rewards, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, if: :has_free_sample

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "full_description", "logo_url", "header_image_url", "commission_rate",
             "commission_description", "terms_and_conditions", "instagram_url", "facebook_url", "twitter_url",
             "available_locations", "is_preview", "has_free_sample", "email", "created_at", "updated_at",
             "lock_version")
      .merge(account_id: account.id, website_hostname: account.websites.first.hostnames.first,
             impact_rewards: impact_rewards.sort_by(&:target_revenue_in_cents),
             product_category_list: tag_list("product_category"),
             positive_impact_area_list: tag_list("positive_impact_area"))
  end

  def tag_list(tag_type)
    tags.where(tag_type: tag_type).map(&:name)
  end

  def self.tagged_with(tag_names)
    Tag.where(name: tag_names).map(&:brands).uniq
  end
end
