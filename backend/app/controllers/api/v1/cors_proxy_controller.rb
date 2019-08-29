require "down"

module Api
  module V1
    class CorsProxyController < RestAdminController
      before_action :authenticate_user!

      def download
        file = Down.download(CGI.unescape(params[:url].strip), max_size: 20_000_000)
        return render json: { error: "File content error" }, status: :unprocessable_entity if file.size.zero?
      rescue Down::TooLarge
        render json: { error: "File size exceed limit" }, status: :unprocessable_entity
      rescue Down::NotFound
        render json: { error: "Can't download file from this URL" }, status: :unprocessable_entity
      else
        process_file(file)
      end

      private

      def process_file(file)
        if !file.content_type.start_with?("image")
          render json: { error: "Wrong file format" }, status: :unprocessable_entity
        else
          send_data(file.read, type: file.content_type)
        end
      end
    end
  end
end
