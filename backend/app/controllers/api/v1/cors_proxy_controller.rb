require "open-uri"

module Api
  module V1
    class CorsProxyController < RestAdminController
      before_action :authenticate_user!
      before_action :ensure_tenant

      def download
        # rubocop:disable Open, UriEscapeUnescape
        file = open(URI.encode(params[:url]).gsub(%r{^(https|http):/}, '\0/'))
        # rubocop:enable Open, UriEscapeUnescape
      rescue StandardError
        render json: { error: "Can't find any file at this URL" }, status: :unprocessable_entity
      else
        process_file(file)
      end

      private

      def process_file(file)
        if !file.content_type.start_with?("image")
          render json: { error: "Wrong file format" }, status: :unprocessable_entity
        elsif file.size > 20_000_000
          render json: { error: "File size exceed limit" }, status: :unprocessable_entity
        else
          send_data(file.read, type: file.content_type)
        end
      end
    end
  end
end
