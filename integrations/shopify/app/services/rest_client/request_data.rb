class RestClient::RequestData
  def initialize(shop_domain)
    @shop_domain = shop_domain
  end

  def convert_product(product)
    {
      name: product.title,
      url: "/products/#{product.handle}",
      source: "shopify",
      source_id: product.id,
      payload: product,
    }
  end

  def convert_to_cents(amount)
    (100 * amount.to_r).to_i
  end

  def convert_line_item(item)
    {
      id: item.product_id,
      quantity: item.quantity,
      name: item.title,
      price: convert_to_cents(item.price_set.shop_money.amount),
      currency: item.price_set.shop_money.currency_code,
    }
  end

  def get_affiliate_token(landing_site)
    match = landing_site&.match(/aftk=([^&]*)/)
    match ? match[1] : nil
  end

  def order_payload(order)
    order.attributes.except(:email, :customer, :client_details, :note, :user_id, :location_id, :device_id, :phone,
                            :customer_locale, :note_attributes, :payment_gateway_names, :processing_method,
                            :contact_email, :shipping_lines, :billing_address, :shipping_address, :fulfillments,
                            :origin_location, :payment_details)
  end

  def convert_order(order)
    {
      source: "shopify",
      source_id: order.id,
      amount_in_cents: convert_to_cents(order.subtotal_price_set.shop_money.amount),
      currency: order.currency,
      products: order.line_items.map { |item| convert_line_item(item) },
      affiliate_token: get_affiliate_token(order.landing_site),
      payload: order_payload(order),
    }
  end

  def headers
    {
      Content_type: :json,
      Authorization: "Plain #{ENV['SHOP_API_TOKEN']}",
      Hostname: @shop_domain,
    }
  end
end
