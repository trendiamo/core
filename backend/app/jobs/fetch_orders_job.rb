class FetchOrdersJob
  def self.perform
    Mixpanel::FetchOrders.perform
  end
end
