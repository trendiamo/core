class CreateOrder
  attr_accessor :stripe_token

  def initialize(stripe_token)
    @stripe_token = stripe_token
  end

  def perform # rubocop:disable Metrics/AbcSize
    order = Spree::Order.create!(email: "buyer@mail.com", store: store)
    order.update!(line_items_attributes: line_items_attributes)
    order.next!
    order.update!(bill_address_attributes: address_attributes, ship_address_attributes: address_attributes)
    order.next!
    order.next!
    Spree::OrderUpdateAttributes.new(order, payments_attributes: payments_attributes(order)).apply # No such token: xxx
    order.next!
    order.complete!
    order
  end

  private

  def store
    Spree::Store.first
  end

  def product
    Spree::Product.first
  end

  def payment_method
    Spree::PaymentMethod.find_by(name: "Stripe")
  end

  def line_items_attributes
    [{ variant_id: product.master.id, quantity: 1 }]
  end

  def address_attributes
    {
      firstname: "Mike", # use from params
      address1: "Rua do Ouro", # use from params
      city: "Lisbon", # use from params
      country_id: 184, # use from params
      zipcode: "12345", # use from params
      phone: "987654321", # use from params
    }
  end

  def payments_attributes(order)
    [
      {
        amount: order.total,
        payment_method_id: payment_method.id,
        source_attributes: { gateway_payment_profile_id: stripe_token },
      },
    ]
  end
end
