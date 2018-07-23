class ShopifyImportOrders
  def initialize; end

  def perform
    status = { status: "any" }
    orders = ShopifyAPI::Order.all(params: status)
    new_orders_array = []
    orders.each do |order|
      new_orders_array << extract_order_information(order)
    end
    new_orders_array.each do |order_hash|
      spree_order = Spree::Order.find_by(number: order_hash["name"])
      spree_order ? update_order(order_hash, spree_order) : create_order(order_hash)
    end
  end

  private

  def extract_order_information(order)
    new_order_hash = {}
    new_order_hash["number"] = order.attributes["order_number"]
    new_order_hash["item_total"] = order.attributes["total_price"].to_f - order.attributes["total_tax"].to_f
    new_order_hash["total"] = order.attributes["total_price"]
    if order.attributes["cancelled_at"]
      new_order_hash["state"] = "canceled"
      new_order_hash["shipment_state"] = "cancelled"
    else
      return if order.fulfillments.empty?
      new_order_hash["shipment_state"] = order.fulfillments.last.attributes["shipment_status"]
    end
    new_order_hash["adjustments"] = order.refunds.map(&:attributes) unless order.refunds.empty?
    new_order_hash["state"] = order.attributes["fulfillment_status"]
    new_order_hash["completed_at"] = order.attributes["processed_at"]
    new_order_hash["shipment_total"] = if order.shipping_lines.empty?
                                         0.0
                                       else
                                         order.shipping_lines.first.attributes["original_prices"]
                                       end
    new_order_hash["promo_total"] = order.attributes["total_discounts"]
    new_order_hash["bill_address"] = order.attributes["billing_address"].attributes
    new_order_hash["ship_address"] = order.attributes["shipping_address"].attributes
    new_order_hash["payment_total"] = order.transactions.map(&:attributes) unless order.transactions.empty?
    new_order_hash["payment_state"] = order.attributes["financial_status"]
    new_order_hash["email"] = order.attributes["email"]
    new_order_hash["currency"] = order.attributes["currency"]
    new_order_hash["last_ip_address"] = order.attributes["browser_ip"]
    new_order_hash["created_by_id"] = order.attributes["user_id"]
    new_order_hash["channel"] = "shopify"
    new_order_hash["included_tax_total"] = order.attributes["total_tax"].to_f
    new_order_hash["item_count"] = order.attributes["line_items"].count
    new_order_hash["cancelled_at"] = order.attributes["cancelled_at"]
    new_order_hash["financial_status"] = order.attributes["financial_status"]
    new_order_hash["line_items"] = order.line_items.map(&:attributes)
    new_order_hash["name"] = order.attributes["name"]
    new_order_hash
  end

  def get_total_payment(transactions_array)
    payment_total = 0.0
    transactions_array.each do |transaction|
      payment_total += transaction["amount"].to_f if transaction["status"] == "success"
    end
    payment_total
  end

  def import_address(address_hash)
    spree_customer_country = Spree::Country.find_by(name: address_hash["country"].capitalize)
    spree_customer_state = Spree::State.where("name like ?", "%#{address_hash['province']}%").first
    address_hash["phone"] = "00" if address_hash["phone"].empty?
    params = { address: {
      firstname: address_hash["first_name"],
      lastname: address_hash["last_name"],
      address1: address_hash["address1"],
      address2: address_hash["address2"],
      city: address_hash["city"],
      state: spree_customer_state,
      state_name: address_hash["province"],
      country: spree_customer_country,
      zipcode: address_hash["zip"],
      phone: address_hash["phone"],
      company: address_hash["company"],
    }, }
    Spree::Address.create!(params[:address])
  end

  def get_address(address)
    params = { address: {
      firstname: address["first_name"],
      lastname: address["last_name"],
      address1: address["address1"],
      address2: address["address2"],
    }, }
    spree_address = Spree::Address.where(params[:address]).first
    import_address(address) unless spree_address
  end

  def get_shipment_state(status)
    case  status
    when "cancelled", "error", "failure"
      "canceled"
    when "open"
      "read"
    when "pending"
      "pending"
    when "success"
      "shipped"
    end
  end

  def get_payment_state(status)
    case status
    when "pending", "patially_paid", "authorized"
      "balance_due"
    when "paid", "refunded"
      "paid"
    when "partially_refunded"
      "credit_owed"
    when "voided"
      "void"
    end
  end

  def get_state(order_hash)
    if order_hash["cancelled_at"]
      "canceled"
    else
      "complete"
    end
  end

  def get_adjustment_total(order_hash)
    total = 0.0
    return total unless order_hash["adjustments"]
    order_hash["adjustments"].each do |adjustment|
      next unless adjustment["refund_line_items"].map(&:attributes).empty?
      adjustment["refund_line_items"].map(&:attributes).each do |adjustment_item|
        total += + adjustment_item["subtotal"]
      end
    end
    total
  end

  def  get_adjustments(order_hash, spree_order)
    return unless order_hash["adjustments"]
    order_hash["adjustments"].each do |adjustment|
      next unless adjustment["refund_line_items"].map(&:attributes).empty?
      adjustment["refund_line_items"].map(&:attributes).each do |adjustment_item|
        adjustment_label = "#{adjustment_item['line_item'].attributes['title']} issue"
        spree_adjustment = Spree::Adjustment.find_by(order_id: spree_order.id, label: adjustment_label)
        if spree_adjustment
          spree_adjustment.update(amount: adjustment_item["subtotal"].to_f)
        else
          params = { adjustment: {
            adjustable_id: spree_order.id,
            adjustable_type: "Spree::Order",
            order: spree_order,
            amount: adjustment_item["subtotal"].to_f,
            label: adjustment_label,
          }, }
          spree_adjustment = Spree::Adjustment.create!(params[:adjustment])
          spree_order.adjustments << spree_adjustment
        end
      end
    end
  end

  def create_order(order_hash)
    spree_user = Spree::User.find_by(email: order_hash["email"])
    params = { order: {
      number: order_hash["name"],
      item_total: order_hash["item_total"],
      adjustment_total: get_adjustment_total(order_hash),
      total: order_hash["total"].to_f - get_adjustment_total(order_hash),
      state: get_state(order_hash),
      user: spree_user,
      completed_at: order_hash["completed_at"],
      bill_address: get_address(order_hash["bill_address"]),
      ship_address: get_address(order_hash["ship_address"]),
      payment_total: get_total_payment(order_hash["payment_total"]),
      shipment_state: get_shipment_state(order_hash["shipment_state"]),
      payment_state: get_payment_state(order_hash["payment_state"]),
      email: order_hash["email"],
      currency: order_hash["currency"],
      last_ip_address: order_hash["last_ip_address"],
      shipment_total: order_hash["shipment_total"],
      promo_total: order_hash["promo_total"],
      channel: order_hash["channel"],
      included_tax_total: order_hash["included_tax_total"],
      item_count: order_hash["item_count"],
      canceled_at: order_hash["cancelled_at"],
    }, }
    spree_order = Spree::Order.create!(params[:order])
    params = { shipment: {
      cost: 0,
      order_id: spree_order.id,
      state: get_shipment_state(order_hash["shipment_state"]),
      stock_location_id: 1,
    }, }
    spree_order.shipments << Spree::Shipment.create!(params[:shipment])
    order_hash["line_items"].each do |line_item|
      spree_variant = Spree::Variant.find_by(sku: line_item["sku"])
      params = { line_item: {
        variant_id: spree_variant.id,
        order: spree_order,
        quantity: line_item["fulfillable_quantity"],
        price: line_item["price"], promo_total: line_item["total_discount"],
        included_tax_total: line_item["tax_lines"].first.attributes["price"],
      }, }
      spree_line_item = Spree::LineItem.create!(params[:line_item])
      spree_order.line_items << spree_line_item
    end
    get_adjustments(order_hash, spree_order)
  end

  def update_order(order_hash, spree_order)
    params = { order: {
      number: order_hash["name"],
      adjustment_total: get_adjustment_total(order_hash),
      item_total: order_hash["item_total"],
      total: order_hash["total"].to_f - get_adjustment_total(order_hash),
      state: get_state(order_hash),
      completed_at: order_hash["completed_at"],
      bill_address: get_address(order_hash["bill_address"]),
      ship_address: get_address(order_hash["ship_address"]),
      payment_total: get_total_payment(order_hash["payment_total"]),
      shipment_state: get_shipment_state(order_hash["shipment_state"]),
      payment_state: get_payment_state(order_hash["payment_state"]),
      currency: order_hash["currency"],
      last_ip_address: order_hash["last_ip_address"],
      shipment_total: order_hash["shipment_total"],
      promo_total: order_hash["promo_total"],
      included_tax_total: order_hash["included_tax_total"],
      item_count: order_hash["item_count"],
      canceled_at: order_hash["cancelled_at"],
    }, }
    spree_order.update(params[:order])
    spree_order.shipments.first.update(state: get_shipment_state(order_hash["shipment_state"]))
    order_hash["line_items"].each do |line_item|
      spree_variant = Spree::Variant.find_by(sku: line_item["sku"])
      spree_line_item = Spree::LineItem.where(variant_id: spree_variant.id, order_id: spree_order.id)
      params = { line_item: {
        variant_id: spree_variant.id,
        order: spree_order,
        quantity: line_item["fulfillable_quantity"],
        price: line_item["price"], promo_total: line_item["total_discount"],
        included_tax_total: line_item["tax_lines"].first.attributes["price"],
      }, }
      if spree_line_item
        spree_line_item.update(params[:line_item])
      else
        spree_line_item = Spree::LineItem.create!(params[:line_item])
        spree_order.line_items << spree_line_item
      end
    end
    get_adjustments(order_hash, spree_order)
  end
end
