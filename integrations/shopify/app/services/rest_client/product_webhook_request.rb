class RestClient::ProductWebhookRequest
  def initialize(shop_domain, webhook)
    @shop_domain = shop_domain
    @product_webhook = webhook
    @request_data = RestClient::RequestData.new(@shop_domain)
  end

  def create_product
    find_product
    RestClient.post("#{ENV['BASE_SHOP_API_URL']}/products", converted_product, @request_data.request_headers)
  end

  def update_product
    find_product
    RestClient.put("#{ENV['BASE_SHOP_API_URL']}/products/#{@product.id}",
                   converted_product, @request_data.request_headers)
  end

  def destroy_product
    RestClient.delete("#{ENV['BASE_SHOP_API_URL']}/products/#{@product_webhook[:id]}", @request_data.request_headers)
  end

  private

  def find_product
    @product = ShopifyAPI::Product.find(@product_webhook[:id])
  end

  def converted_product
    { product: { name: @product.title,
                 url: "/#{@product.class.element_name}/#{@product.handle}",
                 source: "shopify",
                 source_id: @product.id,
                 payload: { product: @product }, } }.to_json
  end
end
