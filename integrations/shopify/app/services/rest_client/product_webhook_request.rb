class RestClient::ProductWebhookRequest
  def initialize(shop_domain, webhook)
    @shop_domain = shop_domain
    @product_webhook = webhook
    @request_data = RestClient::RequestData.new(@shop_domain)
  end

  def create_product
    product = find_and_convert_product
    RestClient.post(base_url, { product: product }.to_json, @request_data.headers)
  end

  def update_product
    product = find_and_convert_product
    RestClient.put("#{base_url}/#{@product_webhook[:id]}", { product: product }.to_json, @request_data.headers)
  end

  def destroy_product
    RestClient.delete("#{base_url}/#{@product_webhook[:id]}", @request_data.headers)
  end

  private

  def base_url
    "#{ENV['SHOP_API_URL']}/products"
  end

  def find_and_convert_product
    product = ShopifyAPI::Product.find(@product_webhook[:id])
    @request_data.convert_product(product)
  end
end
