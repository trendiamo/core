class Bubble::ProductsController < BubbleController
  def index
    # @collection = Collection.find(params[:collection_id])
    # byebug
    # @shopify_collection = ShopifyAPI::SmartCollection.find(@collection.handle)
    # byebug
    # products = Product.select(:id, :user_id, :product_ref, :likes_count, :media_items, :anonymous_likes_count).all.map(&:attributes)
    # byebug
    # render json: params[:collection_id]
  end
  def show
    @product = Product.find(params[:id])
    render json: @product
  end
  def create
    # @create_collection = Bubble::CreateCollection.new(collection_params)
    # if @create_collection.perform
    #   render json: @create_collection, status: :created
    # else
    #   render json: { errors: @create_collection.errors }, status: :unprocessable_entity
    # end
  end


  private

  def product_params
    params.require(:product).permit(:handle, :title, :type, :profile_pic_url, :cover_pic_url, :description)
  end
end
