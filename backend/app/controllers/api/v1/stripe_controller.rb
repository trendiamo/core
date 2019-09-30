module Api
  module V1
    class StripeController < RestAdminController
      before_action :authenticate_user!

      def connect
        @result = perform_request
        if @result.is_a?(RuntimeError)
          head :bad_request
        elsif JSON.parse(@result)["error"]
          render_errors
        else
          update_user
        end
      end

      private

      def update_user
        if current_user.update(stripe_user_id: JSON.parse(@result)["stripe_user_id"])
          render json: current_user
        else
          render_errors(current_user.errors.full_messages.map { |string| { title: string } })
        end
      end

      def perform_request
        payload = {
          client_secret: ENV["STRIPE_SECRET_KEY"],
          code: params[:code],
          grant_type: "authorization_code",
        }
        RestClient::Request.execute(method: :post, url: "https://connect.stripe.com/oauth/token", payload: payload)
      rescue RestClient::Exception => e
        e
      end

      def render_errors(errors)
        errors ||= [{ title: "Cannot create stripe account." }]

        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
