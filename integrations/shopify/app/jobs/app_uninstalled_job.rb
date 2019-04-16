class AppUninstalledJob < ApplicationJob
  def perform(shop_domain:, webhook:) # rubocop:disable Lint/UnusedMethodArgument
    # webhook for when app is uninstalled, could be used to delete all products

    shop = Shop.find_by(shopify_domain: shop_domain)
    shop.destroy!
    # shop.with_shopify_session do
    # end
  rescue StandardError, ShopifyAPI::ValidationException, ShopifyAPI::Base::InvalidSessionError,
         ShopifyAPI::Limits::LimitUnavailable, InMemorySessionStore::EnvironmentError,
         ShopifySessionRepository::ConfigurationError => e
    Rollbar.warning(e)
  end
end
