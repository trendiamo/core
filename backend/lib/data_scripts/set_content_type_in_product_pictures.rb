# url = "https://www.pionier-workwear.com/index.php?sxx_page=online.shop.products.details&sxx_call%5Bb18bf8141a%5D%5BIID%5D=3601"
# SimpleChatProductMessage.where(url: url).count
# 1

# pic_url = "https://trendiamo-assets.imgix.net/uploads/account-34/0b76fbfb-upload"
# Picture.find_by(url: pic_url)

# Picture.where("url LIKE ?", "%-upload").last
# https://console-assets.ams3.digitaloceanspaces.com/uploads/account-60/78fba883-upload
# https://trendiamo-assets.imgix.net/uploads/account-60/78fba883-upload

# https://console-assets.ams3.digitaloceanspaces.com/uploads/account-34/0b76fbfb-upload
# https://trendiamo-assets.imgix.net/uploads/account-34/0b76fbfb-upload

# SimpleChatMessage.where(type: "SimpleChatProductMessage").where.not(text: nil).last.text
# original_pic_url = "https://www.castelbel.com/media/1598/c2-0804_01.jpg?anchor=center&rnd=131570668950000000&preset=imagesSliderBig"

# SimpleChatMessage.where(type: "SimpleChatProductMessage").where.not(text: nil).count
# 177

client = Aws::S3::Client.new(access_key_id: ENV["DO_SPACES_KEY_ID"], secret_access_key: ENV["DO_SECRET_ACCESS_KEY"])

def find_content_type(url)
  uri_url = URI(url)
  Net::HTTP.start(uri_url.host, uri_url.port, use_ssl: true) do |http|
    http.use_ssl = true if url.starts_with?("https")
    headers = http.head(uri_url.path).to_hash
    headers["content-type"][0]
  end
end

def download_image(url)
  uri_url = URI(url)
  Net::HTTP.start(uri_url.host, uri_url.port, use_ssl: true) do |http|
    http.use_ssl = true if url.starts_with?("https")
    http.get(uri_url.path).body
  end
end

def find_extension(content_type)
  if content_type == "image/jpeg"
    "jpg"
  elsif content_type == "image/png"
    "png"
  else
    raise "Unknown content_type: #{content_type}"
  end
end

# SimpleChatMessage.where(type: "SimpleChatProductMessage").where.not(text: nil)
#                  .select { |e| e.pic.url.ends_with?("-upload") }.length

SimpleChatMessage.where(type: "SimpleChatProductMessage").where.not(text: nil).map do |e|
  next unless e.pic.url.ends_with?("-upload")

  original_pic_url = JSON.parse(e.text)["picUrl"]
  content_type = find_content_type(original_pic_url)

  source_key = URI(e.pic.url).path[1..-1]
  extension = find_extension(content_type)
  destination_key = "#{source_key}.#{extension}"

  client.put_object(bucket: ENV["DO_BUCKET"], key: destination_key, body: download_image(original_pic_url),
                    content_type: content_type, acl: "public-read")
  e.pic.update!(url: "#{e.pic.url}.#{extension}")
  sleep 3 # Note we got a Aws::S3::Errors::SlowDown when not using this
end
