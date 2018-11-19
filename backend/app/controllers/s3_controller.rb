class S3Controller < ApplicationController
  before_action :authenticate_user!

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
    @file_key ||= "uploads/#{folder}/#{SecureRandom.hex(4)}/#{params[:object_name]}"
  end

  def folder
    if %w[personas-profile-pics users-profile-pics].include?(params[:type])
      params[:type]
    else
      "unknown"
    end
  end

  def s3_presigner
    @s3_presigner ||= Aws::S3::Presigner.new
  end

  def s3_bucket
    @s3_bucket ||= Aws::S3::Resource.new.bucket(ENV["DO_BUCKET"])
  end
end
