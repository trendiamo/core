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
      render json: { errors: @create_product.errors }, status: :unprocessable_entity
    end
  end

  def update
    @backend_product = Product.find(params[:id])
    @shopify_product = ShopifyAPI::Product.find(@backend_product.product_ref)
    product_params.each do |key, value|
      @shopify_product.attributes[key] = value
    end
    if @shopify_product.save
      render json: @shopify_product
    else
      render json: { errors: @shopify_product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @backend_product = Product.find(params[:id])
    ShopifyAPI::Product.delete(@backend_product.product_ref)
    @backend_product.destroy
    render json: { ok: true }
  end

  private

  def product_params
    params.require(:product).permit(:title, :body_html, :handle, :vendor, :product_type, :tags, :published_scope,
                                    :template_suffix, :metafields_global_title_tag,
                                    :metafields_global_description_tag, :media_items,
                                    images: %i[id src position width height],
                                    options: %i[name position values],
                                    variants: %i[barcode compare_at_price fulfillment_service grams inventory_management
                                                 inventory_policy metafields old_inventory_quantity option1 option2
                                                 option3 position price requires_shipping sku taxable
                                                 tax_code title weight weight_unit inventory_quantity])
  end
end
