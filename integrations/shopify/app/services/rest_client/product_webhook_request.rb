class RestClient::ProductWebhookRequest
  def initialize(shop_domain, webhook)
    @shop_domain = shop_domain
    @product_webhook = webhook
    @request_data = RestClient::RequestData.new(@shop_domain)
  end

  def create_product
    product = find_and_convert_product
    RestClient.post("#{ENV['SHOP_API_URL']}/products", { product: product }, @request_data.headers)
  end

  def update_product
    product = find_and_convert_product
    RestClient.put("#{ENV['SHOP_API_URL']}/products/#{@product_webhook[:id]}", product, @request_data.headers)
  end

  def destroy_product
    RestClient.delete("#{ENV['SHOP_API_URL']}/products/#{@product_webhook[:id]}", @request_data.headers)
  end

  private

  def find_and_convert_product
    product = ShopifyAPI::Product.find(@product_webhook[:id])
    @request_data.convert_product(product)
  end
end
