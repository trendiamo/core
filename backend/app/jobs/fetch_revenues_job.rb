class FetchRevenuesJob < ApplicationJob
  queue_as :default

  def perform
    Mixpanel::FetchRevenues.perform
  end
end
