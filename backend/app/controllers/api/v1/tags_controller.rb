module Api
  module V1
    class TagsController < RestAdminController
      def index
        @tags = Tag.all.order(:name)
        authorize @tags
        render json: @tags
      end
    end
  end
end
