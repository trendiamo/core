class Mixpanel::FetchOrders
  def self.perform
    new.perform
  end

  def initialize
    @dates = {
      from_date: Time.zone.yesterday.to_formatted_s(:iso8601),
      to_date: Time.zone.today.to_formatted_s(:iso8601),
    }
    @affiliate_tokens = Affiliation.all.pluck(:token)
  end

  def perform
    json = mixpanel_orders
    return unless json

    orders = []
    json.keys.each do |token|
      affiliation = Affiliation.find_by(token: token)
      json[token]["orders"].each { |order| orders << order_params(affiliation, order) } if affiliation
    end
    Order.create!(orders)
  end

  private

  def mixpanel_orders
    result = ::Jql::RunQuery.new(mixpanel_orders_params, "orders").perform
    JSON.parse(result)[0]
  end

  def mixpanel_orders_params
    {
      dates: @dates,
      affiliateTokens: @affiliate_tokens,
    }
  end

  def order_params(affiliation, order)
    {
      seller: affiliation.user,
      account: affiliation.account,
      captured_at: Time.now.utc,
      products: order["products"],
      amount_in_cents: order["amountInCents"],
      currency: order["currency"],
      commission_rate: affiliation.account.brand.commission_rate,
    }
  end
end
