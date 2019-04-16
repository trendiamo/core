module ShopApi
  module V1
    class ProductsController < RestController
      before_action :set_tenant_from_hostname
      before_action :ensure_tenant
      before_action :authenticate

      def index
        @products = Product.all
        authorize @products
        chain = @products
        render json: chain
      end

      def create
        @product = Product.new(product_params)
        authorize @product
        if @product.save
          render json: @product, status: :created
        else
          render_error
        end
      end

      def show
        @product = Product.find(params[:id])
        authorize @product
        render json: @product
      end

      def update
        @product = Product.find_by(source_id: params[:id])
        authorize @product
        if @product.update(product_params)
          render json: @product
        else
          render_error
        end
      end

      def destroy
        @product = Product.find_by(source_id: params[:id])
        authorize @product
        if @product.destroy
          render json: { data: @product }
        else
          render_error
        end
      end

      private

      def product_params
        permitted = params.require(:product).permit(:name, :url, :source, :source_id)
        permitted.merge(payload: params[:product][:payload].permit!.to_h)
      end

      def render_error
        errors = @product.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def authenticate
        auth_header = request.headers["Authorization"]
        return if auth_header == "Plain #{ENV['AUTH_TOKEN']}"

        user_not_authorized
      end

      def set_tenant_from_hostname
        hostname_header = request.headers["Hostname"]
        set_current_tenant(Website.find_with_hostname(hostname_header)&.account)
      end
    end
  end
end
