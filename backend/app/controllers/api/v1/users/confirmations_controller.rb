module Api
  module V1
    module Users
      class ConfirmationsController < Devise::ConfirmationsController
        def show
          self.resource = resource_class.confirm_by_token(params[:confirmation_token])
          yield resource if block_given?

          login = "#{ENV['FRONTEND_BASE_URL']}/login##{resource.errors.empty? ? 'confirmed' : 'error'}"
          redirect_to login
        end
      end
    end
  end
end
