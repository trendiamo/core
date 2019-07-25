module Api
  module V1
    class PicturesController < RestAdminController
      def index
        @pictures = Picture.all
        authorize @pictures
        chain = sorting(pagination(@pictures))
        render json: chain
      end

      def create
        @picture = Picture.new(picture_params)
        authorize @picture
        if @picture.save
          render json: @picture, status: :created
        else
          render_error(@picture.errors[:url][0] || "Cannot create picture.")
        end
      end

      def destroy
        @pictures = Picture.where(id: params[:ids])
        authorize @pictures
        if destroy_all
          render json: { data: @pictures }
        else
          render_error("Cannot delete at least one record.")
        end
      end

      private

      def file_format
        result = params[:file_type].gsub("image/", "")
        result == "jpg" ? "jpeg" : result
      end

      def picture_params
        result = params.require(:picture).permit(:url, :file_type)
        result[:file_format] = file_format
        result
      end

      def destroy_all
        has_restriction_errors = false
        @pictures.each do |picture|
          picture.destroy!
        rescue ActiveRecord::DeleteRestrictionError
          has_restriction_errors = true
        end
        !has_restriction_errors
      end

      def render_error(title)
        errors = [{ title: title }]
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
