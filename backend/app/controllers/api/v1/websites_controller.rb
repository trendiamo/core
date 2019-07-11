module Api
  module V1
    class WebsitesController < RestAdminController
      before_action :authenticate_user!
      before_action :ensure_tenant

      def show
        @website = policy_scope(Website).find(params[:id])
        authorize @website
        render json: @website
      end

      def update
        @website = policy_scope(Website).find(params[:id])
        authorize @website
        if @website.update(website_params)
          render json: @website
        else
          errors = @website.errors.full_messages.map { |string| { title: string } }
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      private

      def website_params
        params.require(:website).permit(:preview_mode, :is_e_commerce, hostnames: [])
      end
    end
  end
end
