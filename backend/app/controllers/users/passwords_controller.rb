module Users
  class PasswordsController < Devise::PasswordsController

    # POST /resource/password
    # create the email link
    def create
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?

      if successfully_sent?(resource)
        # respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
        render json: { resource: resource }
      else
        # respond_with(resource)
        render json: { errors: resource.errors.full_messages }
      end
    end

    # GET /resource/password/edit?reset_password_token=abcdef
    def edit
      self.resource = resource_class.new
      # self.resource = resource_class.with_reset_password_token(params[:reset_password_token])
      set_minimum_password_length
      resource.reset_password_token = params[:reset_password_token]
      path = "login"
      query = "?reset_password_token="
      hash = "#reset_password"
      redirect_to "/#{path}#{query}#{params[:reset_password_token]}#{hash}"
    end

    # PUT /resource/password
    def update # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
      self.resource = resource_class.reset_password_by_token(resource_params)
      yield resource if block_given?

      if resource.errors.empty?
        resource.unlock_access! if unlockable?(resource)
        sign_in(resource_name, resource) if Devise.sign_in_after_reset_password
        # respond_with resource, location: after_resetting_password_path_for(resource)
        token = Tiddle.create_and_return_token(resource, request)
        render json: { user: resource, authentication_token: token }
      else
        set_minimum_password_length
        # respond_with resource
        render json: { errors: resource.errors.full_messages }
      end
    end
  end
end
