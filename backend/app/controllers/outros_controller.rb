class OutrosController < ApplicationController
  def index
    @outros = Outro.includes(:persona).all
    authorize @outros
    render json: sorting(pagination(@outros))
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

  def render_error
    errors = @outro.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
