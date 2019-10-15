module Api
  module V1
    class MesController < RestAdminController
      before_action :authenticate_user!

      def show
        render json: current_user
      end

      def show_details
        render json: current_user, details: true
      end

      def referrals
        referrals_info = User.where(referred_by_code: current_user.referral_code).map do |user|
          { user: user, state: user.orders.any? ? "approved" : "pending" }
        end
        render json: referrals_info
      end

      def update
        update_params = user_params
        filter_update_params(update_params)
        if current_user.update(update_params)
          render json: current_user
        else
          errors = current_user.errors.full_messages.map { |string| { title: string } }
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      def update_details
        update_params = user_params
        filter_update_params(update_params)
        if current_user.update(update_params)
          render json: current_user, details: true
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
        params.require(:user).permit(:first_name, :last_name, :currency, :social_media_url, :bio, :img_url,
                                     :shipping_first_name, :shipping_last_name, :address_line1, :address_line2,
                                     :accepts_terms_and_conditions, :zip_code, :city, :referred_by_code,
                                     :country, img_rect: %i[x y width height])
      end

      def filter_update_params(params)
        if current_user.accepted_terms_and_conditions_at || current_user.referred_by_code
          params.delete(:referred_by_code)
        end
        return unless params[:accepts_terms_and_conditions]

        params.delete(:accepts_terms_and_conditions)
        return if current_user.not_affiliate? || current_user.accepted_terms_and_conditions_at

        params[:accepted_terms_and_conditions_at] = Time.now.utc
      end
    end
  end
end
