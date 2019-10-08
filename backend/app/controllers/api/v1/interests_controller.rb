module Api
  module V1
    class InterestsController < RestAdminController
      def index
        @interests = policy_scope(Interest).all
        authorize @interests
        render json: @interests
      end

      def create
        @interest = Interest.new(user_id: current_user.id,
                                 account_id: Brand.find(params[:brand_id]).account_id)
        authorize @interest
        if @interest.save
          render json: @interest, status: :created
        else
          render_error
        end
      end

      def destroy
        @interest = policy_scope(Interest).find(params[:id])
        authorize @interest
        if @interest.destroy
          render json: { message: "Successfully removed interest" }
        else
          render_error
        end
      end

      private

      def render_error
        errors = @interest.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
