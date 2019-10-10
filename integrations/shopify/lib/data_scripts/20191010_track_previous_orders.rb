# rubocop:disable Rails/Output

base_url = "#{ENV['SHOP_API_URL']}/orders"

Shop.all.each do |shop|
  shop.activate_shopify_session
  request_data = RestClient::RequestData.new(shop.shopify_domain)

  begin
    orders = ShopifyAPI::Order.where(created_at_min: shop.created_at)
    orders.each do |order|
      converted_order = request_data.convert_order(order)
      data = { order: converted_order }.to_json
      RestClient.post(base_url, data, request_data.headers) if converted_order[:affiliate_token]
    end
  rescue ActiveResource::ForbiddenAccess
    puts("Cannot access shop: #{shop.shopify_domain}")
  end
end

# rubocop:enable Rails/Output
