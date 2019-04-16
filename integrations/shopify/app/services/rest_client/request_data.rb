class RestClient::RequestData
  def initialize(shop_domain)
    @shop_domain = shop_domain
  end

  def convert_product(product)
    { product: { name: product.title,
                 url: "/#{product.class.element_name}/#{product.handle}",
                 source: "shopify",
                 source_id: product.id,
                 payload: { product: product }, } }.to_json
  end

  def request_headers
    { Content_type: :json,
      Authorization: "Plain #{ENV['BASE_SHOP_API_TOKEN']}",
      Hostname: @shop_domain, }
  end
end
