module Api
  module V1
    class S3Controller < RestAdminController
      before_action :authenticate_user!
      before_action :process_file

      def sign
        render json: {
          fileUrl: "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/#{file_key}",
          signedUrl: signed_url,
        }
      end

      private

      def signed_url
        s3_sign_params = {
          bucket: ENV["DO_BUCKET"],
          key: file_key,
          content_type: params[:content_type],
          acl: "public-read",
        }
        s3_presigner.presigned_url(:put_object, s3_sign_params)
      end

      def file_key
        uploads_subdir = current_tenant ? `account-#{current_tenant.id}` : `user-#{current_user.id}`
        @file_key ||= "uploads/#{uploads_subdir}/#{SecureRandom.hex(4)}-#{params[:object_name]}"
      end

      def s3_presigner
        @s3_presigner ||= Aws::S3::Presigner.new
      end

      def process_file
        return if params[:content_type].start_with?("image")

        render json: { error: "Wrong file format" }, status: :unprocessable_entity
      end
    end
  end
end
