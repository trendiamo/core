class Stripe::ProcessEvent
  attr_reader :event

  def initialize(event)
    @event = event
  end

  def perform
    method_name = event.type.tr(".", "_")
    if respond_to?(method_name)
      Rails.logger.info "Stripe::ProcessEvent: #{event.type}"
      send(method_name, event)
    else
      Rails.logger.info "Stripe::ProcessEvent: #{event.type} (no action)"
    end
  end

  private

  def customer_source_updated(event)
    stripe_card = event.data.object
    user = User.find_by(stripe_customer_ref: stripe_card.customer)
    if user
      Stripe::CreateOrUpdateLocalCard.new(user, stripe_card).perform
    else
      Rails.logger.warn("Stripe::ProcessEvent: '#{event.type}' stripe event for an unmatched user")
      # Rollbar.warning("Stripe::ProcessEvent: '#{event.type}' stripe event for an unmatched user", event: event)
    end
  end

  def customer_source_created(event)
    customer_source_updated(event)
  end

  def charge_succeeded(event)
    stripe_card = event.data.object.source
    user = User.find_by(stripe_customer_ref: stripe_card.customer)
    if user
      Stripe::CreateOrUpdateLocalCard.new(user, stripe_card).perform
    else
      Rails.logger.warn("Stripe::ProcessEvent: '#{event.type}' stripe event for an unmatched user")
      # Rollbar.warning("Stripe::ProcessEvent: '#{event.type}' stripe event for an unmatched user", event: event)
    end
  end
end
