module Api
  module V1
    class ImagesController < RestAdminController
      def index
        @images = Image.all
        authorize @images
        chain = sorting(pagination(@images))
        render json: chain
      end

      def create
        @image = Image.new(image_params)
        authorize @image
        if @image.save
          render json: @image, status: :created
        else
          render_error(@image.errors[:url][0] || "Cannot create image.")
        end
      end

      def destroy
        @images = Image.where(id: params[:ids])
        authorize @images
        if destroy_all
          render json: { data: @images }
        else
          render_error("Cannot delete at least one record.")
        end
      end

      private

      def file_format
        result = params[:file_type].gsub("image/", "")
        result == "jpg" ? "jpeg" : result
      end

      def image_params
        result = params.require(:image).permit(:url, :file_type)
        result[:file_format] = file_format
        result
      end

      def destroy_all
        has_restriction_errors = false
        @images.each do |image|
          image.destroy!
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
