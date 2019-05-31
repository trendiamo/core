module Api
  module V1
    class UsersController < RestAdminController
      def index
        @users = policy_scope(User).where(account: current_tenant)
        authorize @users
        chain = sorting(pagination(@users))
        render json: chain
      end

      def create
        @user = User.new(user_params)
        @user.account = current_tenant
        authorize @user
        if @user.save
          render json: @user, status: :created
        else
          render_error
        end
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

      def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :profile_pic_url, :role,
                                     :password, :password_confirmation)
      end

      def render_error
        errors = @user.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
