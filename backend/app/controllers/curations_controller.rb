class CurationsController < RestController
  def index
    @curations = Curation.all
    authorize @curations
    fresh_when(etag: @curations)
    chain = sorting(pagination(@curations)) # makes it so headers are sent even if stale
    render json: chain if stale?(@curations)
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
