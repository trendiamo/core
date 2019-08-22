module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        def create
          if user_can_login?
            user = warden.authenticate!(auth_options)
            render json: { user: user }
          else
            render_unauthorized_error
          end
        end

        def destroy
          reset_session
          render json: {}
        end

        private

        # this is invoked before destroy and we have to override it
        def verify_signed_out_user; end

        def user_can_login?
          user = User.find_by(email: params["user"]["email"])
          return true unless user

          up_to_us? ? user.promoter? : user.frekkls_user?
        end

        def up_to_us?
          host = request.headers["HTTP_X_FORWARDED_HOST"]
          host.include?("uptous") || (host.split(":").shift == "localhost" && params[:is_up_to_us])
        end

        def render_unauthorized_error
          render json: { errors:
            [{ title: "You can access this account just through #{up_to_us? ? 'Frekkls' : 'Uptous'}" }],
                         status: :unauthorized, }
        end
      end
    end
  end
end
