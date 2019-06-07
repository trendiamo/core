module Api
  module V1
    class UsersController < RestAdminController
      def index
        @users = policy_scope(current_tenant.users)
        authorize @users
        chain = sorting(pagination(@users))
        render json: chain
      end

      def create
        @user = User.new(user_params)
        authorize @user
        if @user.save
          @membership = Membership.new(user: @user, account: current_tenant, role: params[:user][:role])
          return render json: @user, status: :created if @membership.save

          @user.destroy!
          render_membership_error
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
        params.require(:user).permit(:email, :first_name, :last_name, :profile_pic_url,
                                     :password, :password_confirmation)
      end

      def render_membership_error
        errors = @membership.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @user.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
