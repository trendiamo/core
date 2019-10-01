module Api
  module V1
    class AffiliateLinksController < RestAdminController
      before_action :authenticate_user!

      def create
        @affiliate_link = policy_scope(AffiliateLink).find_or_initialize_by(affiliate_link_params)
        authorize @affiliate_link
        if @affiliate_link.persisted?
          render json: @affiliate_link
        elsif @affiliate_link.save
          render json: @affiliate_link, status: :created
        else
          render_error
        end
      end

      private

      def affiliate_link_params
        params.require(:affiliate_link).permit(:url, :affiliation_id)
      end

      def render_error
        errors = @affiliate_link.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
