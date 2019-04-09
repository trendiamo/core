module Api
  module V1
    class MesController < RestAdminController
      before_action :authenticate_user!

      def show
        render json: current_user
      end

      def update
        if current_user.update(user_params)
          render json: current_user
        else
          errors = current_user.errors.full_messages.map { |string| { title: string } }
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      def update_onboarding
        user_params = params.require(:user).permit(:onboarding_stage)
        if current_user.update(user_params)
          render json: current_user
        else
          errors = current_user.errors.full_messages.map { |string| { title: string } }
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name, :profile_pic_url)
      end
    end
  end
end
