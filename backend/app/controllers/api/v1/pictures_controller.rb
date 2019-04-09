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
        if @pictures.destroy_all
          render json: { data: @pictures }
        else
          render_error
        end
      end
    end
  end
end
