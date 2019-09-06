module Api
  module V1
    class AffiliationsController < RestAdminController
      def create
        @affiliation = Affiliation.new(affiliation_params)
        @affiliation.account_id = Brand.find(params[:brand_id]).account_id
        authorize @affiliation
        if @affiliation.save
          render json: @affiliation, status: :created
        else
          render_error
        end
      end

      private

      def affiliation_params
        params.require(:affiliation).permit(:user_id)
      end

      def render_error
        errors = @affiliation.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
