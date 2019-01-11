class ProductPicksController < RestController
  def sort
    @product_picks = ProductPick.where(id: params[:ids])
    authorize @product_picks
    if @product_picks.all? { |product_pick| product_pick.update(order: params[:ids].index(product_pick.id)) }
      render json: @product_picks
    else
      render_error
    end
  end
end
