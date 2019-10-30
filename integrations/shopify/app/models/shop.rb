class Shop < ApplicationRecord
  include ShopifyApp::SessionStorage
  # after_create :perform_export_products

  def as_json(_options = {})
    attributes
      .slice("id", "shopify_domain", "shopify_token", "tracking_orders", "accepted_terms_and_conditions_at",
             "created_at", "updated_at")
      .merge(name: shop_name)
  end

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
    ShopifyAPI::Product.all.map do |product|
      converted_product = request_data.convert_product(product)
      RestClient.post("#{ENV['SHOP_API_URL']}/products", { product: converted_product }.to_json, request_data.headers)
    end
  end

  def activate_shopify_session
    shop_session = ShopifyAPI::Session.new(shopify_domain, shopify_token)
    ShopifyAPI::Base.activate_session(shop_session)
  end

  private

  def shop_name
    shop_attributes = ShopifyAPI::Shop.current&.attributes
    shop_attributes && shop_attributes["name"]
  end
end
