class User < ApplicationRecord
  include CleanupAssets

  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  acts_as_tenant

  belongs_to :account

  def as_json(_options = {})
    attributes
      .slice("id", "email", "first_name", "last_name", "profile_pic_url", "onboarding_stage", "created_at",
             "updated_at")
      .merge(account: { website_ids: account.website_ids })
  end
end
