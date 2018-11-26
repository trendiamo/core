class TriggersController < ApplicationController
  before_action :change_trigger_params, only: %i[create update]

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
    render json: { trigger: @trigger, flow: @trigger.flow }
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

  def change_trigger_params
    params[:trigger][:flow_type] = params[:trigger][:flow_type].singularize
    params[:trigger][:flow_type][0] = params[:trigger][:flow_type][0].capitalize
  end

  def trigger_params
    params.require(:trigger).permit(:order, :flow_id, :flow_type, url_matchers: [])
  end

  def render_error
    errors = @trigger.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
