class ProductsCreateJob < ApplicationJob
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    shop.with_shopify_session do
      RestClient::ProductWebhookRequest.new(shop_domain, webhook).create_product
    end
  end
end
