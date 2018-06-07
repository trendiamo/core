class StripeController < ApiController
  def webhook
    event = JSON.parse(request.body.read, object_class: OpenStruct)
    Stripe::ProcessEvent.new(event).perform
    head :ok
  end
end
