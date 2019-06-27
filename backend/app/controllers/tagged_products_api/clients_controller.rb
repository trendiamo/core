module TaggedProductsApi
  class ClientsController < RestController
    before_action :authenticate, only: %i[create update destroy]

    def index
      if params[:hostname]
        render json: TaggedProductsClient.where(hostname: params[:hostname])
      else
        render json: TaggedProductsClient.all
      end
    end

    def create
      @client = TaggedProductsClient.new(client_params)
      if @client.save
        render json: @client, status: :created
      else
        render_error
      end
    end

    def show
      @client = TaggedProductsClient.find(params[:id])
      render json: @client
    end

    def update
      @client = TaggedProductsClient.find(params[:id])
      if @client.update(client_params)
        render json: @client
      else
        render_error
      end
    end

    def destroy
      @client = TaggedProductsClient.find(params[:id])
      if @client.destroy
        render json: { data: @client }
      else
        render_error
      end
    end

    private

    def client_params
      permitted = params.require(:client).permit(:hostname)
      permitted.merge(payload: params[:client][:payload].permit!.to_h)
    end

    def render_error
      errors = @client.errors.full_messages.map { |string| { title: string } }
      render json: { errors: errors }, status: :unprocessable_entity
    end

    def authenticate
      auth_header = request.headers["Authorization"]
      return if auth_header == "Plain #{ENV['TAGGED_PRODUCTS_API_TOKEN']}"

      user_not_authorized
    end
  end
end
