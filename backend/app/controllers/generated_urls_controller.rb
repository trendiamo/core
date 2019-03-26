class GeneratedUrlsController < RestController
  before_action :ensure_tenant

  def index
    @generated_urls = current_user.generated_urls.order("created_at DESC").limit(20)
    authorize @generated_urls
    render json: @generated_urls
  end

  def create
    @generated_url = GeneratedUrl.new(generated_url_params)
    authorize @generated_url
    if @generated_url.save
      render json: @generated_url, status: :created
    else
      render_error
    end
  end

  private

  def generated_url_params
    params.require(:generated_url).permit(:url).merge(user_id: current_user.id)
  end

  def render_error
    errors = @generated_url.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
