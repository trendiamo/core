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
        convert_and_assign_pictures
        if @seller.update(seller_params)
          render json: @seller
        else
          render_error
        end
      end

      def create
        convert_and_assign_pictures
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
        params.require(:seller).permit(:name, :description, :instagram_url, :profile_pic_id, :lock_version,
                                       :profile_pic_animation_id, pic_rect: %i[x y width height])
      end

      def convert_and_assign_pictures
        %i[profile_pic profile_pic_animation].each do |pic|
          pic_url = params[:seller][pic][:url]
          params[:seller]["#{pic}_id"] = pic_url.present? ? Picture.find_or_create_by!(url: pic_url).id : nil
          params[:seller].delete(pic)
        end
      end

      def render_error
        errors = @seller.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
