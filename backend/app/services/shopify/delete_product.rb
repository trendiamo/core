module Shopify
  class DeleteProduct
    attr_reader :product

    def initialize(product_id)
      @product_id = product_id
    end

    def perform
      JSON.parse(delete_shopify_product.body)
    rescue ActiveResource::ResourceNotFound
      {}
    end

    private

    def delete_shopify_product
      @shopify_product = ShopifyAPI::Product.find(@product_id)
      @shopify_product.destroy
    end
  end
end
