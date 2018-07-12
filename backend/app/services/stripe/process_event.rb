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
end
