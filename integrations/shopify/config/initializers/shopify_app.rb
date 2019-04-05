ShopifyApp.configure do |config|
  config.application_name = "Frekkls Shopify App"

  config.api_key = ENV["SHOPIFY_API_KEY"]
  config.secret = ENV["SHOPIFY_SHARED_SECRET"]

  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = "read_products,write_script_tags"

  config.embedded_app = false

  config.after_authenticate_job = false

  config.session_repository = ShopifyApp::InMemorySessionStore

  config.scripttags = [
    { event: 'onload', src: 'https://plugiamo.s3.eu-central-1.amazonaws.com/plugin.js', display_scope: "all" },
  ]
end
