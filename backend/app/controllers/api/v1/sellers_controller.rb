module Api
  module V1
    class SellersController < RestAdminController
      before_action :ensure_tenant

      def index
        @sellers = policy_scope(Seller).all
        authorize @sellers
        chain = sorting(pagination(@sellers))
        render json: chain
      end

      def show
        @seller = policy_scope(Seller).find(params[:id])
        authorize @seller
        render json: @seller
      end

      def update
        @seller = policy_scope(Seller).find(params[:id])
        authorize @seller
        convert_and_assign_images
        if @seller.update(seller_params)
          render json: @seller
        else
          render_error
        end
      end

      def create
        convert_and_assign_images
        @seller = Seller.new(seller_params)
        authorize @seller
        if @seller.save
          render json: @seller, status: :created
        else
          render_error
        end
      end

      def destroy
        @sellers = policy_scope(Seller).where(id: params[:ids])
        authorize @sellers
        if @sellers.destroy_all
          render json: { data: @sellers }
        else
          render_error
        end
      end

      private

      def seller_params
        params.require(:seller).permit(:name, :bio, :instagram_url, :img_id, :animated_img_id, :lock_version,
                                       img_rect: %i[x y width height])
      end

      def convert_and_assign_images
        %i[img animated_img].each do |img|
          seller_params = params.require(:seller)
          img_url = seller_params[img][:url]
          seller_params["#{img}_id"] = img_url.present? ? Image.find_by(url: img_url)&.id : nil
          seller_params.delete(img)
        end
      end

      def render_error
        errors = @seller.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
