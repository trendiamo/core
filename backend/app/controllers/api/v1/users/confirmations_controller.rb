module Api
  module V1
    module Users
      class ConfirmationsController < Devise::ConfirmationsController
        def show
          self.resource = resource_class.confirm_by_token(params[:confirmation_token])
          yield resource if block_given?

          sign_in_and_redirect(resource)
        end

        private

        def after_sign_in_path_for(user)
          # base url should have a scheme in it (http or https) otherwise some browsers / OS won't redirect.
          # if you have `localhost` in your ENV then change it to `http://localhost`.
          base_url = user.not_affiliate? ? ENV["FRONTEND_BASE_URL"] : ENV["UPTOUS_FRONTEND_BASE_URL"]
          user.errors.empty? ? "#{base_url}/#confirmed" : "#{base_url}/login#error"
        end
      end
    end
  end
end
