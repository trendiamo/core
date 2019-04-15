class AppUninstalledJob < ActiveJob::Base
  def perform(shop_domain:, webhook:)
    # webhook for when app is uninstalled, could be used to delete all products

    shop = Shop.find_by(shopify_domain: shop_domain)
    shop.destroy
    # shop.with_shopify_session do
    # end
  end
end
