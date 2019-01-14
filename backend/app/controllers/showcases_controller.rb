class ShowcasesController < RestController
  def index
    @showcases = Showcase.all
    authorize @showcases
    chain = sorting(pagination(@showcases))
    render json: chain
  end

  def create
    @showcase = Showcase.new(showcase_params)
    authorize @showcase
    if @showcase.save
      render json: @showcase, status: :created
    else
      render_error
    end
  end

  def show
    @showcase = Showcase.find(params[:id])
    authorize @showcase
    render json: @showcase.as_json
  end

  def update
    @showcase = Showcase.find(params[:id])
    authorize @showcase
    if @showcase.update(showcase_params)
      render json: @showcase
    else
      render_error
    end
  end

  def destroy
    @showcases = Showcase.where(id: params[:ids])
    authorize @showcases
    if @showcases.destroy_all
      render json: { data: @showcases }
    else
      render_error
    end
  end

  private

  def showcase_params
    params.require(:showcase).permit(
      :name, :title, :subtitle, :persona_id,
      spotlights_attributes: [
        :id, :persona_id, :_destroy,
        product_picks_attributes: %i[
          id url name description display_price pic_url _destroy
        ],
      ]
    )
  end

  def render_error
    errors = @showcase.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
