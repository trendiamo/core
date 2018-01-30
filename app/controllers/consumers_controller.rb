class ConsumersController < ApplicationController
  def multipass
    @consumer = Consumer.first
    consumer_attributes = @consumer.attributes.slice("email", "created_at", "first_name", "last_name")

    customer_info = consumer_attributes.merge(remote_ip: request.remote_ip)
    token = ShopifyMultipass.new(ENV["SHOPIFY_MULTIPASS_KEY"]).generate_token(customer_info)

    shopify_store = "https://trendiamo-testing.myshopify.com"
    redirect_to "#{shopify_store}/account/login/multipass/#{token}"
  end
end
