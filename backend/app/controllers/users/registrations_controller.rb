module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_permitted_parameters

    # create method copied from Devise::RegistrationsController, changed the success case response
    def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      build_resource(sign_up_params)

      resource.save
      yield resource if block_given?
      if resource.persisted?
        if resource.active_for_authentication?
          set_flash_message! :notice, :signed_up
          sign_up(resource_name, resource)
          # respond_with resource, location: after_sign_up_path_for(resource)
          token = Tiddle.create_and_return_token(resource, request)
          render json: { authentication_token: token, user: resource }
        else
          # set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
          expire_data_after_sign_in!
          render json: { errors: ["signed up but #{resource.inactive_message}"] }
          # respond_with resource, location: after_inactive_sign_up_path_for(resource)
        end
      else
        clean_up_passwords resource
        set_minimum_password_length
        # respond_with resource
        render json: { errors: resource.errors.full_messages, user: resource }
      end
    end

    private

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[username first_name last_name subscribed_to_newsletter])
    end
  end
end
