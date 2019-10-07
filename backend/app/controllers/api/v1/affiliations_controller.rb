module Api
  module V1
    class AffiliationsController < RestAdminController
      def index
        @affiliations = policy_scope(Affiliation).all
        authorize @affiliations
        render json: @affiliations
      end

      def create
        @affiliation = Affiliation.new(user_id: current_user.id,
                                       account_id: Brand.find(params[:brand_id]).account_id)
        authorize @affiliation
        if @affiliation.save
          render json: @affiliation, status: :created
        else
          render_error
        end
      end

      def destroy
        @affiliation = policy_scope(Affiliation).find(params[:id])
        if @affiliation.account.orders.length.positive?
          return render json: { error: "This affiliation has revenues" }, status: :unprocessable_entity
        end

        authorize @affiliation
        if @affiliation.destroy
          render json: { message: "Successfully removed affiliation" }
        else
          render_error
        end
      end

      private

      def render_error
        errors = @affiliation.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
