module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        before_action :configure_permitted_parameters

        def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
          build_resource(sign_up_params)

          resource.save # rubocop:disable Rails/SaveBang
          yield resource if block_given?
          if resource.persisted?
            if resource.active_for_authentication?
              # set_flash_message!(:notice, :signed_up)
              sign_up(resource_name, resource)
              # respond_with(resource, location: after_sign_up_path_for(resource))
            else
              # set_flash_message!(:notice, :"signed_up_but_#{resource.inactive_message}")
              expire_data_after_sign_in!
              # respond_with(resource, location: after_inactive_sign_up_path_for(resource))
            end
            render json: resource
          else
            clean_up_passwords(resource)
            set_minimum_password_length
            errors = resource.errors.full_messages.map { |string| { title: string } }
            render json: { errors: errors }
          end
        end

        def create_with_invite # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
          # recipient_id: nil -> invites where recipient-users are not yet confirmed
          @invite = Invite.where(recipient_id: nil)
                          .where.not(token: [nil, ""])
                          .find_by(email: params[:user][:email], token: params[:token])

          return render json: { errors: [{ title: "Unable to signup" }] } if @invite.nil?

          build_resource(sign_up_with_invite_params)
          resource.save # rubocop:disable Rails/SaveBang
          yield resource if block_given?
          if resource.persisted?
            if resource.active_for_authentication?
              sign_up(resource_name, resource)
              @invite.update!(recipient: resource)
              sign_in(resource)
              render json: { user: resource }
            else
              expire_data_after_sign_in!
            end
          else
            clean_up_passwords(resource)
            set_minimum_password_length
            errors = resource.errors.full_messages.map { |string| { title: string } }
            render json: { errors: errors }
          end
        end

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

        def sign_up_params
          super.merge!(sign_up_extra_params)
        end

        def sign_up_with_invite_params
          params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
                .merge!(confirmed_at: Time.now.utc,
                        memberships_attributes: [{ role: @invite.role, account: @invite.account }])
        end

        def sign_up_extra_params # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
          if params[:user][:affiliate_role]
            return {
              affiliate_role: "promoter",
              referred_by_code: params[:user][:referred_by_code],
              social_media_url: params[:user][:social_media_url],
            }
          end

          {
            memberships_attributes: [{
              role: :owner,
              account_attributes: {
                name: params[:user][:account_name],
                websites_attributes: [{ name: params[:user][:account_name], hostnames: params[:user][:hostnames] }],
              },
            }],
          }
        end

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name subscribed_to_newsletter])
        end
      end
    end
  end
end
