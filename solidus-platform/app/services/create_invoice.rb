class CreateInvoice
  def initialize(order)
    @order = order
  end

  def perform
    @client = Invoicexpress::Client.new(
      account_name: ENV["INVOICEXPRESS_NAME"],
      api_key: ENV["INVOICEXPRESS_KEY"]
    )
    invoice = @client.create_invoice(invoice_content)
    invoice_state = Invoicexpress::Models::InvoiceState.new(
      state: "finalized"
    )
    @client.update_invoice_state(invoice.id, invoice_state)
  end

  private

  def invoice_content
    Invoicexpress::Models::Invoice.new(
      date: Date.current,
      due_date: Date.current,
      reference: @order.number,
      client: Invoicexpress::Models::Client.new(
        name: [@order.bill_address["firstname"], @order.bill_address["lastname"]].join(" "),
        email: @order.email,
        address: [@order.bill_address["address1"], @order.bill_address["address2"]].join(", "),
        city: @order.bill_address["city"],
        postal_code: @order.bill_address["zipcode"],
        country: @order.bill_address.country["name"],
        phone: @order.bill_address["phone"]
      ),
      items: get_line_items(@order.line_items)
    )
  end

  def get_line_items(line_items)
    array = []
    line_items.each do |line_item|
      array << Invoicexpress::Models::Item.new(
        name: line_item.variant.product.name,
        unit_price: line_item["price"] - (line_item["included_tax_total"] / line_item.quantity),
        quantity: line_item.quantity,
        description: get_line_item_description(line_item.variant.option_values),
        discount: (line_item.promo_total / line_item.price),
        tax: Invoicexpress::Models::Tax.new(
          name: "VAT23"
        )
      )
    end
    array
  end

  def get_line_item_description(option_values)
    return unless option_values
    array = []
    option_values.each do |option_value|
      array << option_value.option_type.presentation + ": " + option_value.presentation
    end
    array.join(" / ")
  end
end
