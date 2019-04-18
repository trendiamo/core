module Api
  module V1
    class PicturesController < RestAdminController
      def index
        @pictures = Picture.all
        authorize @pictures
        chain = sorting(pagination(@pictures))
        render json: chain
      end

      def destroy
        @pictures = Picture.where(id: params[:ids])
        authorize @pictures
        if destroy_all
          render json: { data: @pictures }
        else
          render_error
        end
      end

      private

      def destroy_all
        has_restriction_errors = false
        @pictures.each do |picture|
          picture.destroy!
        rescue ActiveRecord::DeleteRestrictionError
          has_restriction_errors = true
        end
        !has_restriction_errors
      end

      def render_error
        errors = [{ title: "Cannot delete at least one record." }]
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
