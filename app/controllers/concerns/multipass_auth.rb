module MultipassAuth
  def shopify_token(consumer)
    ShopifyMultipass.new(ENV["SHOPIFY_MULTIPASS_KEY"]).generate_token(customer_info(consumer))
  end

  def customer_info(consumer)
    consumer_attributes = consumer.attributes.slice("email", "first_name", "last_name")
    consumer_attributes.merge(remote_ip: request.remote_ip).stringify_keys
  end
end
