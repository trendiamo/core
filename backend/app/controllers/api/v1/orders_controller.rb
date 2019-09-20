module Api
  module V1
    class OrdersController < RestAdminController
      before_action :authenticate_user!

      def index
        @orders = policy_scope(Order).where(captured_at: params[:from_date]..params[:to_date])
        authorize @orders
        render json: @orders
      end
    end
  end
end
