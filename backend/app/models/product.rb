class Product < ApplicationRecord
  acts_as_tenant

  validates :source, inclusion: { in: %w[shopify magento],
                                  message: "is an invalid value", }

  def as_json(_options = {})
    attributes
      .slice("id", "name", "url", "source", "payload", "created_at", "updated_at")
  end
end
