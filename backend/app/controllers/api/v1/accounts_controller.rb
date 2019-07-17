module Api
  module V1
    class AccountsController < RestAdminController
      def index
        @accounts = policy_scope(Account).where("name ILIKE ?", "%#{params[:searchQuery]}%").order("name ASC")
        authorize @accounts
        chain = pagination(@accounts)
        render json: chain
      end

      def create
        @account = Account.new(account_params)
        authorize @account
        if @account.save
          render json: @account, status: :created
        else
          render_error
        end
      end

      def show
        @account = policy_scope(Account).find_by(slug: params[:slug])
        authorize @account
        render json: @account
      end

      def destroy
        @account = policy_scope(Account).find_by(slug: params[:slug])
        authorize @account
        if @account.destroy
          render json: { message: "Successfully removed account" }
        else
          render_error
        end
      end

      private

      def account_params
        params.require(:account).permit(:name, websites_attributes: [:name, hostnames: []])
      end

      def render_error
        errors = @account.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
