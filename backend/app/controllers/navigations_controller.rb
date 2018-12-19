class NavigationsController < RestController
  def index
    @navigations = Navigation.includes(:persona).all
    authorize @navigations
    fresh_when(etag: @navigations)
    chain = sorting(pagination(@navigations)) # makes it so headers are sent even if stale
    render json: chain if stale?(@navigations)
  end

  def create
    @navigation = Navigation.new(navigation_params)
    authorize @navigation
    if @navigation.save
      render json: @navigation, status: :created
    else
      render_error
    end
  end

  def show
    @navigation = Navigation.find(params[:id])
    authorize @navigation
    fresh_when(etag: @navigation)
    render json: @navigation if stale?(@navigation)
  end

  def update
    @navigation = Navigation.find(params[:id])
    authorize @navigation
    if @navigation.update(navigation_params)
      render json: @navigation
    else
      render_error
    end
  end

  def destroy
    @navigations = Navigation.where(id: params[:ids])
    authorize @navigations
    if @navigations.destroy_all
      render json: { data: @navigations }
    else
      render_error
    end
  end

  private

  def navigation_params
    params.require(:navigation).permit(:persona_id, :name, navigation_items_attributes:
      %i[id text url pic_url _destroy])
  end

  def render_error
    errors = @navigation.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
