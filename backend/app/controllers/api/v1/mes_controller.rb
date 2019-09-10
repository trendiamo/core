module Api
  module V1
    class MesController < RestAdminController
      before_action :authenticate_user!

      def show
        render json: current_user
      end

      def referrals
        referrals_info = User.where(referred_by_code: current_user.referral_code).map do |user|
          { user: user, state: user.orders.any? ? "approved" : "pending" }
        end
        render json: referrals_info
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

      def request_upgrade
        unless current_user.requested_upgrade_to_seller_at
          SparkpostMailer.request_promoter_upgrade(current_user).deliver_now
          current_user.update!(requested_upgrade_to_seller_at: Time.now.utc)
        end
        render json: current_user
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name, :img_url, img_rect: %i[x y width height])
      end
    end
  end
end
