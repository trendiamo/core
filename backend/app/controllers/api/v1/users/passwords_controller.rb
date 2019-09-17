module Api
  module V1
    module Users
      class PasswordsController < Devise::PasswordsController
        # POST /resource/password
        # create the email link
        def create
          self.resource = resource_class.send_reset_password_instructions(resource_params)
          yield resource if block_given?

          # if successfully_sent?(resource)
          #   respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
          # else
          #   respond_with(resource)
          # end
          render json: {}
        end

        # GET /resource/password/edit?reset_password_token=abcdef
        def edit
          self.resource = resource_class.new
          # self.resource = resource_class.with_reset_password_token(params[:reset_password_token])
          set_minimum_password_length
          resource.reset_password_token = params[:reset_password_token]
          query = "?reset_password_token=#{params[:reset_password_token]}"
          base = request.host.match?(/uptous\.co$/) ? ENV["UPTOUS_FRONTEND_BASE_URL"] : ENV["FRONTEND_BASE_URL"]
          redirect_to "#{base}/password-reset#{query}"
        end

        # PUT /resource/password
        def update # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
          self.resource = resource_class.reset_password_by_token(resource_params)
          yield resource if block_given?

          if resource.errors.empty?
            resource.unlock_access! if unlockable?(resource)
            sign_in(resource_name, resource) if Devise.sign_in_after_reset_password
            # respond_with resource, location: after_resetting_password_path_for(resource)
            render json: { user: resource }
          else
            set_minimum_password_length
            # respond_with resource
            errors = resource.errors.full_messages.map { |string| { title: string } }
            render json: { errors: errors }
          end
        end
      end
    end
  end
end
