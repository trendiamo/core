class RestClient::RequestData
  def initialize(shop_domain)
    @shop_domain = shop_domain
  end

  def convert_product(product)
    {
      name: product.title,
      url: "/products/#{product.handle}",
      source: "shopify",
      source_id: product.id,
      payload: product,
    }
  end

  def headers
    {
      Content_type: :json,
      Authorization: "Plain #{ENV['SHOP_API_TOKEN']}",
      Hostname: @shop_domain,
    }
  end
end
