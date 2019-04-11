module Api
  module V1
    class S3Controller < RestAdminController
      before_action :authenticate_user!
      before_action :ensure_tenant

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
        @file_key ||= "uploads/account-#{current_tenant.id}/#{SecureRandom.hex(4)}-#{params[:object_name]}"
      end

      def s3_presigner
        @s3_presigner ||= Aws::S3::Presigner.new
      end
    end
  end
end
