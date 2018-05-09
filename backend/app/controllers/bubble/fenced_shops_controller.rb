class Bubble::FencedShopsController < BubbleController
  def create
    @fenced_shop = FencedShop.new(fenced_shop_params)
    if @fenced_shop.save
      render json: @fenced_shop, status: :created
    else
      render json: { errors: @fenced_shop.errors }, status: :unprocessable_entity
    end
  end

  private

  def fenced_shop_params
    params.require(:fenced_shop).permit(:domain_name, :logo_pic_url, :cover_pic_url, :title, :text, :cta_text, :favicon_url)
  end
end
