class NavigationItemsController < RestController
  def sort
    @navigation_items = NavigationItem.where(id: params[:ids])
    authorize @navigation_items
    if @navigation_items.all? { |item| item.update(order: params[:ids].index(item.id)) }
      render json: @navigation_items
    else
      render_error
    end
  end
end
