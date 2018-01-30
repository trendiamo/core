class ConsumersController < ApplicationController
  def multipass
    @consumer = Consumer.first
    consumer_attributes = @consumer.attributes.slice("email", "created_at", "first_name", "last_name")

    customer_info = consumer_attributes.merge(remote_ip: request.remote_ip)
    token = ShopifyMultipass.new(ENV["SHOPIFY_MULTIPASS_KEY"]).generate_token(customer_info)

    redirect_to "https://#{ENV["SHOPIFY_STORE"]}/account/login/multipass/#{token}"
  end
end
