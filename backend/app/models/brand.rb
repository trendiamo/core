class Brand < ApplicationRecord
  acts_as_tenant
  belongs_to :account

  validates :name, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "logo_url", "created_at", "updated_at", "lock_version")
  end
end
