module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        before_action :configure_permitted_parameters

        def update # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/PerceivedComplexity
          self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
          prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

          resource_updated = update_resource(resource, account_update_params)
          yield resource if block_given?
          if resource_updated
            if is_flashing_format?
              flash_key = begin
                if update_needs_confirmation?(resource, prev_unconfirmed_email)
                  :update_needs_confirmation
                else
                  :updated
                end
              end
              render json: { errors: flash_key }
            end
            bypass_sign_in(resource, scope: resource_name)
            render json: {}
          else
            clean_up_passwords(resource)
            set_minimum_password_length
            errors = resource.errors.full_messages.map { |string| { title: string } }
            render json: { errors: errors }
          end
        end

        private

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name subscribed_to_newsletter])
        end
      end
    end
  end
end
