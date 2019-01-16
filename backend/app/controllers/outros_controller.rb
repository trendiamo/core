class OutrosController < RestController
  def index
    @outros = Outro.includes(:persona).all
    authorize @outros
    chain = sorting(pagination(@outros))
    render json: chain
  end

  def create
    @outro = Outro.new(outro_params)
    authorize @outro
    if @outro.save
      render json: @outro, status: :created
    else
      render_error
    end
  end

  def show
    @outro = Outro.find(params[:id])
    authorize @outro
    render json: @outro
  end

  def update
    @outro = Outro.find(params[:id])
    authorize @outro
    if @outro.update(outro_params)
      render json: @outro
    else
      render_error
    end
  end

  def destroy
    @outros = Outro.where(id: params[:ids])
    authorize @outros
    if @outros.destroy_all
      render json: { data: @outros }
    else
      render_error
    end
  end

  private

  def outro_params
    params.require(:outro).permit(:persona_id, :name, :chat_bubble_text)
  end

  def render_error
    errors = @outro.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
