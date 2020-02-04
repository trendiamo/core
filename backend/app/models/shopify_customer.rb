class ShopifyCustomer < ApplicationRecord
  def as_json(_options = {})
    attributes
      .slice("id", "email", "answers")
  end

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create! do |shopify_customer|
      shopify_customer.password = SecureRandom.hex(40)
    end
  end
end
