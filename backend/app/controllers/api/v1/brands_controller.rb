module Api
  module V1
    class BrandsController < RestAdminController
      def index
        @brands = policy_scope(Brand).where.not(account_id: current_user.affiliations&.pluck(:account_id))
        authorize @brands
        render json: @brands
      end
    end
  end
end
