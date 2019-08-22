module Api
  module V1
    class BrandsController < RestAdminController
      def index
        @brands = policy_scope(Brand).all
        authorize @brands
        render json: @brands
      end
    end
  end
end
