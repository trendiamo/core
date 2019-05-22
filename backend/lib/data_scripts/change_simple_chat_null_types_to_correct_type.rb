require "open-uri"

@bucket = Aws::S3::Bucket.new(ENV["DO_BUCKET"])
@failed_picture_message_ids = []

def json_if_valid?(string)
  JSON.parse(string)
rescue JSON::ParserError
  false
end

def digital_ocean_path(account)
  do_host = "https://console-assets-db.ams3.digitaloceanspaces.com/"
  URI("#{do_host}uploads/account-#{account.id}/#{SecureRandom.hex(4)}-upload")
end

def pic_existing_or_create_id(product_attributes, account, id) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
  pic_url = product_attributes["picUrl"]
  picture = Picture.find_or_initialize_by(url: pic_url, account: account)
  if picture.new_record?
    new_pic_url = digital_ocean_path(account)
    picture.url = new_pic_url.to_s
    picture.save!
    begin
      source_file = open(URI.encode(pic_url)) # rubocop:disable Lint/UriEscapeUnescape, Security/Open
      @bucket.put_object(
        acl: "public-read",
        body: source_file,
        key: new_pic_url.path[1..-1]
      )
    rescue StandardError
      picture.destroy!
      @failed_picture_message_ids << id
    end
  end
  return nil unless picture.persisted?

  picture.id
end

messages_with_non_allocated_message_types = SimpleChatMessage.where(type: nil)

messages_with_non_allocated_message_types.map do |message|
  product_attributes = json_if_valid?(message.text)
  if product_attributes
    message.update!(title: product_attributes["title"], type: "SimpleChatProductMessage",
                    display_price: product_attributes["displayPrice"], url: product_attributes["url"],
                    pic_id: pic_existing_or_create_id(product_attributes, message.account, message.id))
  elsif %r{^https:\/\/(?:www\.)?youtube.com\/watch\?(?=[^?]*v=\w+)(?:[^\s?]+)?$}.match?(message.text)
    message.update!(type: "SimpleChatVideoMessage", video_url: message.text)
  else
    message.update!(type: "SimpleChatTextMessage")
  end
end
