class CurationsController < ApplicationController
  def index
    @curations = Curation.all
    authorize @curations
    render json: sorting(pagination(@curations))
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

  def render_error
    errors = @curation.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
