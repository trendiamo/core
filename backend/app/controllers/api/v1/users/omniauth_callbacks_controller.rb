module Api
  module V1
    module Users
      class OmniauthCallbacksController < Devise::OmniauthCallbacksController
        def google # rubocop:disable Metrics/AbcSize
          @user = User.from_omniauth(request.env["omniauth.auth"])
          if @user.persisted?
            sign_in(@user, event: :authentication)
          else
            session["devise.google_data"] = request.env["omniauth.auth"].except(:extra)
          end
          base = request.host.match?(/uptous\.co$/) ? ENV["UPTOUS_FRONTEND_BASE_URL"] : ENV["FRONTEND_BASE_URL"]
          redirect_to "#{base}/##{@user.persisted? ? 'confirmed' : 'error'}"
        end
      end
    end
  end
end
