class Shop < ActiveRecord::Base
  include ShopifyApp::SessionStorage
  after_create :export_products

  def export_products
    shopify_session
    ShopifyAPI::Product.where(vendor: shopify_domain.split(".", 2).first).map do |product|
      converted_product = convert_product(product)
      RestClient.post "#{ENV['BASE_SHOP_API_URL']}/products", converted_product,
                      RestClient::RequestData.new(shopify_domain).request_headers
    end
  end

  def shopify_session
    shop_session = ShopifyAPI::Session.new(shopify_domain, shopify_token)
    ShopifyAPI::Base.activate_session(shop_session)
  end

  def convert_product(product)
    { product: { name: product.title,
                 url: "/#{product.class.element_name}/#{product.handle}",
                 source: "shopify",
                 source_id: product.id,
                 payload: { product: product }, }, }.to_json
  end
end
