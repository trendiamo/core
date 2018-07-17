class CreateInvoice
  def initialize(order)
    @order = order
  end

  def perform
    @client = Invoicexpress::Client.new(
      account_name: "sample",
      api_key: "08d8be4944d410d63210ec09ae75b1e9db96401c"
    )
    invoice = Invoicexpress::Models::Invoice.new(
      date: Date.current,
      due_date: Date.current,
      observations: "",
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
    invoice = @client.create_invoice(invoice)
    invoice_state = Invoicexpress::Models::InvoiceState.new(
      state: "finalized"
    )
    @client.update_invoice_state(invoice.id, invoice_state)
  end

  private

  def get_line_items(line_items)
    array = []
    line_items.each do |line_item|
      array << Invoicexpress::Models::Item.new(
        name: line_item.variant.product.name,
        unit_price: line_item["price"] - line_item["included_tax_total"],
        quantity: line_item.quantity,
        description: get_line_item_description(line_item.variant.option_values),
        tax: Invoicexpress::Models::Tax.new(
          name: "IVA23",
          value: 0.23
        ),
        discount: (line_item.promo_total / line_item.price)
      )
    end
    array
  end

  def get_line_item_description(option_values)
    return unless option_values
    array = []
    option_values.each do |option_value|
      array << option_value.option_type.presentation + ': ' + option_value.presentation
    end
    array.map { |k| "#{k}" }.join(" / ")
  end
end
