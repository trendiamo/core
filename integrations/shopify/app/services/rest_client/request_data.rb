class RestClient::RequestData
  def initialize(shop_domain)
    @shop_domain = shop_domain
  end

  def request_headers
    { Content_type: :json,
      Authorization: "Plain #{ENV['BASE_SHOP_API_TOKEN']}",
      Hostname: @shop_domain, }
  end
end
