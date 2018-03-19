module MultipassAuth
  def shopify_token(user)
    ShopifyMultipass.new(ENV["SHOPIFY_MULTIPASS_KEY"]).generate_token(customer_info(user))
  end

  def customer_info(user)
    user_attributes = user.attributes.slice("username", "email", "first_name", "last_name")
    user_attributes.merge(remote_ip: request.remote_ip).stringify_keys
  end
end
