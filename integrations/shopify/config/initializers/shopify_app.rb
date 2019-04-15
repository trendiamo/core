ShopifyApp.configure do |config|
  config.application_name = "Frekkls Shopify App"

  config.api_key = ENV["SHOPIFY_API_KEY"]
  config.secret = ENV["SHOPIFY_SHARED_SECRET"]

  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = "read_products,write_script_tags"

  config.embedded_app = false

  config.after_authenticate_job = false

  config.session_repository = Shop

  config.scripttags = [
    { event: 'onload', src: 'https://plugiamo.s3.eu-central-1.amazonaws.com/plugin.js', display_scope: "all" },
  ]
  config.webhooks = [
    {topic: 'app/uninstalled', address: "#{ENV["BASE_API_URL"]}/webhooks/app_uninstalled", format: 'json'},
    {topic: 'products/delete', address: "#{ENV["BASE_API_URL"]}/webhooks/products_delete", format: 'json'},
    {topic: 'products/update', address: "#{ENV["BASE_API_URL"]}/webhooks/products_update", format: 'json'},
    {topic: 'products/create', address: "#{ENV["BASE_API_URL"]}/webhooks/products_create", format: 'json'},
  ]
end
