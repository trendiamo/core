require "open-uri"

@client = Aws::S3::Client.new(access_key_id: ENV["DO_SPACES_KEY_ID"], secret_access_key: ENV["DO_SECRET_ACCESS_KEY"])

def digital_ocean_uri(pic_url, account_id)
  filename = URI(pic_url).path.split("/").last
  prefix = "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}"
  URI("#{prefix}/uploads/account-#{account_id}/#{SecureRandom.hex(4)}-#{filename}")
end

def upload_file!(pic_url, new_pic_uri)
  body = open(URI.encode(pic_url)) # rubocop:disable Lint/UriEscapeUnescape, Security/Open
  content_type = body.meta["content-type"]
  bucket = ENV["DO_BUCKET"]
  destination_key = new_pic_uri.path[1..-1]
  @client.put_object(bucket: bucket, key: destination_key, body: body, content_type: content_type, acl: "public-read")
end

Account.all.each do |account|
  ActsAsTenant.default_tenant = account

  Persona.where.not(profile_pic_animation_url: "").each do |persona|
    pic_url = persona.profile_pic_animation_url
    new_pic_uri = digital_ocean_uri(pic_url, account.id)
    upload_file!(pic_url, new_pic_uri)

    new_pic = Picture.create!(url: new_pic_uri)
    persona.update!(profile_pic_animation: new_pic)
  end
end
