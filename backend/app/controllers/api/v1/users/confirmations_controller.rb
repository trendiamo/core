module Api
  module V1
    module Users
      class ConfirmationsController < Devise::ConfirmationsController
        def show
          self.resource = resource_class.confirm_by_token(params[:confirmation_token])
          yield resource if block_given?

          base_url = resource.not_affiliate? ? ENV["FRONTEND_BASE_URL"] : ENV["UPTOUS_FRONTEND_BASE_URL"]
          login = "#{base_url}/login##{resource.errors.empty? ? 'confirmed' : 'error'}"
          redirect_to login
        end
      end
    end
  end
end
