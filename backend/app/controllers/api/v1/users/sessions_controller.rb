module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        def create
          user = warden.authenticate!(auth_options)
          render json: { user: user }
        end

        def destroy
          reset_session
          render json: {}
        end

        private

        # this is invoked before destroy and we have to override it
        def verify_signed_out_user; end
      end
    end
  end
end
