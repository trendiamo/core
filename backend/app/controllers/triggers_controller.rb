class TriggersController < ApplicationController
  def index
    @triggers = Trigger.all.order(:order)
    authorize @triggers
    render json: @triggers
  end
end
