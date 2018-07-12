attachment_config = {
  bucket: ENV["S3_BUCKET_NAME"],
  s3_credentials: {
    access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
    bucket: ENV["S3_BUCKET_NAME"],
  },
  s3_headers: { "Cache-Control" => "max-age=31557600" },
  s3_host_alias: ENV["CDN_HOST"],
  s3_protocol: "https",
  s3_region: ENV["S3_REGION"],
  storage: :s3,
  url: ":s3_alias_url",

  styles: {},
  path: ":class/:id/:filename",
}

unless Rails.env.test?
  attachment_config.each do |key, value|
     Spree::Image.attachment_definitions[:attachment][key.to_sym] = value
     Spree::Taxon.attachment_definitions[:icon][key.to_sym] = value
  end
end
