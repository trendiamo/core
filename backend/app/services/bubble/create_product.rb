module Bubble
  class CreateProduct


    attr_reader :product_params
    def initialize(product_params)
      @product_params = product_params
    end
  #
    def perform
      # create_product && add_shopify_product
      add_shopify_product && create_product
    end
  #
  #   def as_json(_arg)
  #     {
  #       backend_collection: @backend_collection&.as_json,
  #       shopify_collection: @shopify_collection&.as_json,
  #     }
  #   end
  #
  #   def errors
  #     {
  #       backend_collection: @backend_collection&.errors,
  #       shopify_collection: @shopify_collection&.errors,
  #     }
  #   end
  #
  #   private
  #
    def create_product
      @backend_product = Product.new(product_ref: @shopify_product.id, media_items: @product_params.media_items)
      @backend_product.save
    end
  #
    def add_shopify_product
      @shopify_product = ShopifyAPI::Product.new(product_params)
      @shopify_product.save
    end
  #
  #   def for_brand?
  #     collection_params[:type] == "brand"
  #   end
  #
    # def backend_collection_attrs
    #   params.require(:product).permit(:title,
    # end
  #
  #   def shopify_collection_attrs
  #     {
  #       handle: collection_params[:handle],
  #       title: collection_params[:title],
  #       rules: [rule],
  #     }
  #   end
  #
  #   def rule
  #     if for_brand?
  #       { column: "vendor", relation: "equals", condition: collection_params[:handle] }
  #     else
  #       { column: "tag", relation: "equals", condition: "influencer: #{collection_params[:handle]}" }
  #     end
  #   end
  #
  #
  #
  #
  end
end
