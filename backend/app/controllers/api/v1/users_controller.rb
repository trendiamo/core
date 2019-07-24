module Api
  module V1
    class UsersController < RestAdminController
      def index
        @users = policy_scope(current_tenant.users)
        authorize @users
        chain = sorting(pagination(@users))
        render json: chain
      end

      def destroy
        @users = policy_scope(User).where(id: params[:ids])
        authorize @users
        if @users.destroy_all
          render json: { data: @users }
        else
          render_error
        end
      end

      private

      def render_error
        errors = @user.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
