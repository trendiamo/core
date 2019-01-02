class TriggersController < RestController
  def index
    @triggers = Trigger.all.order(:order)
    authorize @triggers
    render json: @triggers
  end

  def create
    @trigger = Trigger.new(trigger_params)
    authorize @trigger
    if @trigger.save
      render json: @trigger, status: :created
    else
      render_error
    end
  end

  def show
    @trigger = Trigger.find(params[:id])
    authorize @trigger
    render json: @trigger
  end

  def update
    @trigger = Trigger.find(params[:id])
    authorize @trigger
    if @trigger.update(trigger_params)
      render json: @trigger
    else
      render_error
    end
  end

  def sort
    @triggers = Trigger.where(id: params[:ids])
    authorize @triggers
    if @triggers.all? { |trigger| trigger.update(order: params[:ids].index(trigger.id)) }
      render json: @triggers
    else
      render_error
    end
  end

  def destroy
    @triggers = Trigger.where(id: params[:ids])
    authorize @triggers
    if @triggers.destroy_all
      render json: { data: @triggers }
    else
      render_error
    end
  end

  private

  def trigger_params
    params.require(:trigger).permit(:flow_id, :flow_type, url_matchers: [])
  end

  def render_error
    errors = @trigger.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
