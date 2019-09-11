ShopifyApp.configure do |config|
  config.application_name = "Frekkls Shopify App"

  config.api_key = ENV["SHOPIFY_API_KEY"]
  config.secret = ENV["SHOPIFY_SHARED_SECRET"]

  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = "read_orders, read_products, write_script_tags"

  config.embedded_app = false

  config.after_authenticate_job = false

  config.session_repository = Shop

  config.scripttags = [
    { event: 'onload', src: 'https://js.frekkls.com/tracker.js', display_scope: "all" },
  ]
  config.webhooks = [
    {topic: 'app/uninstalled', address: "#{ENV["BASE_API_URL"]}/webhooks/app_uninstalled", format: 'json'},
    # {topic: 'products/delete', address: "#{ENV["BASE_API_URL"]}/webhooks/products_delete", format: 'json'},
    # {topic: 'products/update', address: "#{ENV["BASE_API_URL"]}/webhooks/products_update", format: 'json'},
    # {topic: 'products/create', address: "#{ENV["BASE_API_URL"]}/webhooks/products_create", format: 'json'},
    {topic: 'orders/paid', address: "#{ENV["BASE_API_URL"]}/webhooks/orders_paid", format: 'json'},
  ]
end
