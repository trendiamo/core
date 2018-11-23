class TriggersController < ApplicationController
  def index
    @triggers = Trigger.all.order(:order)
    authorize @triggers
    render json: @triggers
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
end
