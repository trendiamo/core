class ConsumersController < ApplicationController
  before_action :authenticate_consumer!

  def update
    @consumer = current_consumer
    @consumer.attributes = permitted_attributes(@consumer)
    authorize @consumer
    if @consumer.save
      render json: @consumer
    else
      render json: @consumer.errors, status: :unprocessable_entity
    end
  end

  private

  def pundit_user
    current_consumer
  end
end
