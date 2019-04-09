module Api
  module V1
    module Users
      class ConfirmationsController < Devise::ConfirmationsController
        # show method copied from Devise::ConfirmationsController
        def show # rubocop:disable Metrics/AbcSize
          self.resource = resource_class.confirm_by_token(params[:confirmation_token])
          yield resource if block_given?

          Hubspot::ImportContact.new(resource, request.remote_ip).perform

          # if resource.errors.empty?
          #   set_flash_message!(:notice, :confirmed)
          #   respond_with_navigational(resource) { redirect_to after_confirmation_path_for(resource_name, resource) }
          # else
          #   respond_with_navigational(resource.errors, status: :unprocessable_entity) { render :new }
          # end
          respond_with_navigational(resource) do
            login = "https://#{ENV['SHOPIFY_STORE']}/account/login##{resource.errors.empty? ? 'confirmed' : 'error'}"
            redirect_to login
          end
        end
      end
    end
  end
end
