class Shop < ApplicationRecord
  include ShopifyApp::SessionStorage
  after_create :perform_export_products

  def perform_export_products
    export_products
  rescue StandardError, ShopifyAPI::ValidationException, ShopifyAPI::Base::InvalidSessionError,
         ShopifyAPI::Limits::LimitUnavailable, InMemorySessionStore::EnvironmentError,
         ShopifySessionRepository::ConfigurationError => e
    Rollbar.warning(e)
  end

  def export_products
    activate_shopify_session
    request_data = RestClient::RequestData.new(shopify_domain)
    ShopifyAPI::Product.where(vendor: shopify_domain.split(".", 2).first).map do |product|
      converted_product = request_data.convert_product(product)
      RestClient.post("#{ENV['BASE_SHOP_API_URL']}/products", converted_product,
                      request_data.request_headers)
    end
  end

  def activate_shopify_session
    shop_session = ShopifyAPI::Session.new(shopify_domain, shopify_token)
    ShopifyAPI::Base.activate_session(shop_session)
  end
end
