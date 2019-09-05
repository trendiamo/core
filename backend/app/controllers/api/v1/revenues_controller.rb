module Api
  module V1
    class RevenuesController < RestAdminController
      before_action :authenticate_user!

      def index
        @revenues = current_user.revenues.where(captured_at: params[:from_date]..params[:to_date])
        authorize @revenues
        render json: @revenues
      end
    end
  end
end
