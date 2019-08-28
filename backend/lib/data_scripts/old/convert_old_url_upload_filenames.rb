require "open-uri"

@client = Aws::S3::Client.new(access_key_id: ENV["DO_SPACES_KEY_ID"], secret_access_key: ENV["DO_SECRET_ACCESS_KEY"])

def download_file(url)
  open(URI.encode(url)) # rubocop:disable Lint/UriEscapeUnescape, Security/Open
end

def extension_from_content_type(content_type)
  content_type == "image/jpeg" ? ".jpg" : ".png"
end

def old_url_uploaded_digital_ocean_uri(picture, content_type)
  extension = extension_from_content_type(content_type)
  prefix = "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}"
  URI("#{prefix}/uploads/account-#{picture.account_id}/#{SecureRandom.hex(4)}-picture#{extension}")
end

def old_url_uploaded_upload_file!(old_pic_url, new_pic_uri)
  body = download_file(old_pic_url)
  content_type = body.meta["content-type"]
  bucket = ENV["DO_BUCKET"]
  destination_key = new_pic_uri.path[1..-1]
  @client.put_object(bucket: bucket, key: destination_key, body: body, content_type: content_type, acl: "public-read")
end

Picture.where("url LIKE ?", "%-upload").map do |picture|
  sleep 3 # Note we got a Aws::S3::Errors::SlowDown when not using this
  body = download_file(picture.url)
  content_type = body.meta["content-type"]
  new_pic_uri = old_url_uploaded_digital_ocean_uri(picture, content_type)
  old_url_uploaded_upload_file!(picture.url, new_pic_uri)
  picture.update!(url: new_pic_uri.to_s)
end
