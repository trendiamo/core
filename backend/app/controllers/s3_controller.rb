class S3Controller < ApplicationController
  # TODO: make sure we're authed
  def sign
    render json: {
      fileUrl: "https://#{ENV['S3_BUCKET']}.s3.amazonaws.com/#{file_key}",
      signedUrl: signed_url,
    }
  end

  private

  def signed_url
    s3_sign_params = {
      bucket: ENV["S3_BUCKET"],
      key: file_key,
      content_type: params[:content_type],
      acl: "public-read",
    }
    s3_presigner.presigned_url(:put_object, s3_sign_params)
  end

  def file_key
    @file_key ||= "uploads/brand-logos/#{SecureRandom.hex(4)}/#{params[:object_name]}"
  end

  def s3_presigner
    @s3_presigner ||= Aws::S3::Presigner.new
  end

  def s3_bucket
    @s3_bucket ||= Aws::S3::Resource.new.bucket(ENV["S3_BUCKET"])
  end
end
