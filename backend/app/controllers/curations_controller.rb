class CurationsController < RestController
  def index
    @curations = Curation.all
    authorize @curations
    chain = sorting(pagination(@curations))
    render json: chain
  end

  def create
    @curation = Curation.new(curation_params)
    authorize @curation
    if @curation.save
      render json: @curation, status: :created
    else
      render_error
    end
  end

  def show
    @curation = Curation.find(params[:id])
    authorize @curation
    render json: @curation.as_json
  end

  def update
    @curation = Curation.find(params[:id])
    authorize @curation
    if @curation.update(curation_params)
      render json: @curation
    else
      render_error
    end
  end

  def destroy
    @curations = Curation.where(id: params[:ids])
    authorize @curations
    if @curations.destroy_all
      render json: { data: @curations }
    else
      render_error
    end
  end

  private

  def curation_params
    params.require(:curation).permit(
      :name, :title, :subtitle, :persona_id,
      spotlights_attributes: [
        :id, :text, :persona_id, :_destroy,
        product_picks_attributes: %i[
          id url name description display_price pic_url _destroy
        ],
      ]
    )
  end

  def render_error
    errors = @curation.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
