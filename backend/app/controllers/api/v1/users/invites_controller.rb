module Api
  module V1
    module Users
      class InvitesController < RestAdminController
        set_current_tenant_through_filter
        before_action :set_tenant

        def create # rubocop:disable Metrics/MethodLength
          @invite = Invite.new(invite_params)
          @recipient = User.find_by(email: invite_params[:email])
          @invite.recipient = @recipient
          @invite.sender = current_user

          if recipient_belongs_to_sender_account?
            render json: { errors: [{ title: "User is already a member of this account." }] }
          elsif @invite.save
            render json: @invite.deliver_invite
          else
            render json: { errors: [{ title: "Unable to send invite." }] }
          end
        end

        def edit # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
          @invite = Invite.where.not(token: [nil, ""]).find_by(token: params[:token])
          if @invite&.invite_period_valid? && @invite&.update(accepted_at: Time.now.utc)
            if @invite.recipient&.confirmed?
              Membership.create!(user: @invite.recipient, account: @invite.account, role: @invite.role)
              redirect_to "#{ENV['FRONTEND_BASE_URL']}/login#invite-accepted"
            else
              redirect_to "#{ENV['FRONTEND_BASE_URL']}/signup/confirm?email=#{@invite.email}&token=#{@invite.token}"
            end
          else
            redirect_to "#{ENV['FRONTEND_BASE_URL']}/login#invite-error"
          end
        end

        private

        def invite_params
          params.require(:invite).permit(:email, :role)
        end

        def recipient_belongs_to_sender_account?
          @recipient ? @recipient.accounts.find_by(id: current_tenant.id) : false
        end

        def set_tenant
          session_account = Account.find_by(slug: request.headers["X-Session-Account"])
          set_current_tenant(session_account)
        end
      end
    end
  end
end
