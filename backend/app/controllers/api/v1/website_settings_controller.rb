module Api
  module V1
    class WebsiteSettingsController < RestAdminController
      before_action :authenticate_user!
      before_action :ensure_tenant, unless: :current_user_is_seller?

      def show
        return render_default_website_settings if current_user_is_seller?

        @website_settings = policy_scope(WebsiteSettings).first
        authorize @website_settings
        render json: @website_settings
      end

      def update
        @website_settings = policy_scope(WebsiteSettings).find(params[:id])
        authorize @website_settings
        if @website_settings.update(website_settings_params)
          render json: @website_settings
        else
          errors = @website_settings.errors.full_messages.map { |string| { title: string } }
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      private

      def render_default_website_settings
        @default_website_settings = WebsiteSettings.new(theme_color: "#232323", text_color: "white")
        render json: @default_website_settings
      end

      def website_settings_params
        params.require(:website_settings).permit(:theme_color, :text_color, :round_edges)
      end
    end
  end
end
