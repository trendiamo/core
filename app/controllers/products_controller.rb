class ProductsController < ApplicationController
  # before_action :authenticate_user!

  def show
    likes_count = Like.where(product_ref: params[:id]).count
    @product = {
      likes_count: likes_count,
    }
    # authorize @product
    render json: @product
  end
end
