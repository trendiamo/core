class Bubble::ProductsController < BubbleController
  def index
    collection = Collection.find(params[:collection_id])
    shopify_products = ShopifyAPI::Product.where("tags": "influencer: #{collection.handle}").map(&:attributes)
    render json: shopify_products
  end
  def show

  end
  def create
    # @create_product = ShopifyAPI::Product.new(collection_params)
    @create_product = Bubble::CreateProduct.new(product_params)
    if @create_product.perform
      render json: @create_product, status: :created
    else
      render json: { errors: @create_collection.errors }, status: :unprocessable_entity
    end
  end


  private

  def product_params
    params.require(:product).permit(:title, :body_html, :handle, :vendor, :product_type, :tags, :published_scope,
                                    :template_suffix, :metafields_global_title_tag, :variants,
                                    :metafields_global_description_tag, :media_items,
                                    images: %i[id src position width height],
                                    options: %i[Size Color Material])
  end
end
