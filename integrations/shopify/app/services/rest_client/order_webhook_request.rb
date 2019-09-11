class RestClient::OrderWebhookRequest
  def initialize(shop_domain, webhook)
    @shop_domain = shop_domain
    @order_webhook = webhook
    @request_data = RestClient::RequestData.new(@shop_domain)
  end

  def create_order
    order = find_and_convert_order
    return unless order[:affiliate_token]

    RestClient.post(base_url, { order: order }.to_json, @request_data.headers)
  end

  private

  def base_url
    "#{ENV['SHOP_API_URL']}/orders"
  end

  def find_and_convert_order
    order = ShopifyAPI::Order.find(@order_webhook[:id])
    @request_data.convert_order(order)
  end
end
