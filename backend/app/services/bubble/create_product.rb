module Bubble
  class CreateProduct
    attr_reader :product_params
    def initialize(product_params)
      @product_params = product_params
    end

    def perform
      # create_product && add_shopify_product
      add_shopify_product && create_product
    end

    def as_json(_arg)
      {
        backend_product: @backend_product&.as_json,
        shopify_product: @shopify_product&.as_json,
      }
    end

    def errors
      {
        backend_product: @backend_product&.errors,
        shopify_product: @shopify_product&.errors,
      }
    end

    private

    def create_product
      @backend_product = Product.new(product_ref: @shopify_product.id, media_items: @product_params[:media_items])
      @backend_product.save
    end

    def add_shopify_product
      @shopify_product = ShopifyAPI::Product.new(product_params)
      @shopify_product.save
    end
  end
end
