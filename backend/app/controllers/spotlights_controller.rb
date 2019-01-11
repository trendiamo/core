class SpotlightsController < RestController
  def sort
    @spotlights = Spotlight.where(id: params[:ids])
    authorize @spotlights
    if @spotlights.all? { |spotlight| spotlight.update(order: params[:ids].index(spotlight.id)) }
      render json: @spotlights
    else
      render_error
    end
  end
end
