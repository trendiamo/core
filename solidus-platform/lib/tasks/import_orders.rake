task import_orders: :environment do
  def extract_order_information(order)
    keys = %w[number item_total total state adjustment_total completed_at shipment_total additional_tax_total promo_total
      bill_address ship_address payment_total shipment_state payment_state email special_instructions currency last_ip_address created_by_id
      channel included_tax_total item_count approver_id approved_at confirmation_delivered canceled_at canceler_id store_id approver_name frontend_viewable]

    # keys_from_shopify = => ["id", "email", "closed_at", "created_at", "updated_at", "number", "note", "token", "gateway", "test", "total_price", "subtotal_price", "total_weight", "total_tax", "taxes_included", "currency", "financial_status", "confirmed", "total_discounts", "total_line_items_price", "cart_token", "buyer_accepts_marketing", "name", "referring_site", "landing_site", "cancelled_at", "cancel_reason", "total_price_usd", "checkout_token", "reference", "user_id", "location_id", "source_identifier", "source_url", "processed_at", "device_id", "phone", "customer_locale", "app_id", "browser_ip", "landing_site_ref", "order_number", "discount_applications", "discount_codes", "note_attributes", "payment_gateway_names", "processing_method", "checkout_id", "source_name", "fulfillment_status", "tax_lines", "tags", "contact_email", "order_status_url", "admin_graphql_api_id", "line_items", "shipping_lines", "billing_address", "shipping_address", "fulfillments", "refunds", "customer"]

    new_order_hash = Hash[keys.each_with_object(nil).to_a]
    new_order_hash["number"] = order.attributes["order_number"]
    new_order_hash["item_total"] = order.attributes["total_price"].to_f - order.attributes["total_tax"].to_f
    new_order_hash["total"] = order.attributes["total_price"]
    new_order_hash["state"] = order.attributes["fulfillment_status"]
    # new_order_hash["shipment_state"] =
    # new_order_hash["shipment_total"] =
    new_order_hash["payment_state"] = order.attributes["financial_status"]
    new_order_hash["email"] = order.attributes["email"]
    new_order_hash["currency"] = order.attributes["currency"]
    new_order_hash["promo_total"] = order.attributes["total_discounts"]
    # new_order_hash["payment_total"]
    # new_order_hash["special_instructions"] =
    new_order_hash["channel"] = "shopify"
    # new_order_hash["included_tax_total"] =
    new_order_hash["item_count"] = order.attributes["line_items"].count
    new_order_hash["bill_address"] = order.attributes["billing_address"].attributes
    new_order_hash["ship_address"] = order.attributes["shipping_address"].attributes
    # new_order_hash["confirmation_delivered"] =
    new_order_hash
  end

  orders = ShopifyAPI::Order.all
  new_orders_array = []
  orders.each do |order|
    new_orders_array << extract_order_information(order)
  end

end
