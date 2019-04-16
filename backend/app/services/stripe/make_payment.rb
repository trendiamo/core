class Stripe::MakePayment
  attr_reader :product, :shipping, :token

  def initialize(product, shipping, token)
    @product = product
    @shipping = shipping
    @token = token
  end

  def perform
    Stripe::Charge.create!(charge_params)
  rescue Stripe::CardError => e
    { error: e.json_body[:error] }
  rescue Stripe::RateLimitError, Stripe::InvalidRequestError, Stripe::AuthenticationError, Stripe::APIConnectionError,
         Stripe::StripeError # => e
    # Rollbar.warning(e)
    { error: { type: "generic_error", message: generic_error_message } }
  end

  private

  def charge_params
    {
      amount: (product["price"] * 100).to_i,
      currency: "EUR",
      description: "Trendiamo #{product['name']}",
      metadata: product,
      # shipping: shipping,
      source: token["id"],
      statement_descriptor: "Trendiamo purchase",
    }
  end

  def generic_error_message
    "A problem occurred with the payment gateway. We have been notified and will work to solve this."
  end
end
