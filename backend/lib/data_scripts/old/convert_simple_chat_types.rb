require "open-uri"

BUCKET = Aws::S3::Bucket.new(ENV["DO_BUCKET"])

def json_if_valid?(string)
  JSON.parse(string)
rescue JSON::ParserError
  false
end

def digital_ocean_path(picture)
  digest = Digest::SHA1.hexdigest(picture.url)[0..7]
  URI("https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/uploads/account-#{picture.account_id}/#{digest}-upload")
end

def upload_file!(pic_url, new_pic_url)
  source_file = open(URI.encode(pic_url)) # rubocop:disable Lint/UriEscapeUnescape, Security/Open
  BUCKET.put_object(acl: "public-read", body: source_file, key: new_pic_url.path[1..-1])
end

def find_or_create_picture(pic_url, message)
  old_picture = Picture.find_or_initialize_by(url: pic_url, account: message.account)
  return old_picture if old_picture.persisted?

  new_pic_url = digital_ocean_path(old_picture)
  new_picture = Picture.find_or_initialize_by(url: new_pic_url.to_s, account: message.account)
  return new_picture if new_picture.persisted?

  new_picture.url = new_pic_url.to_s
  upload_file!(pic_url, new_pic_url)
  new_picture.save!
  new_picture
end

def compute_product_attributes(message) # rubocop:disable Metrics/MethodLength
  json_product_attributes = json_if_valid?(message.text)

  if json_product_attributes
    {
      type: "SimpleChatProductMessage",
      title: json_product_attributes["title"],
      display_price: json_product_attributes["displayPrice"],
      url: json_product_attributes["url"],
      pic: find_or_create_picture(json_product_attributes["picUrl"], message),
      # text: nil,
    }
  elsif %r{^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*}.match?(message.text)
    {
      type: "SimpleChatVideoMessage",
      video_url: message.text,
      # text: nil,
    }
  else
    raise("WARNING: Message##{message.id} has this text: #{message.text}") if /{/ =~ message.text

    {
      type: "SimpleChatTextMessage",
    }
  end
end

SimpleChatMessage.where(type: nil).map do |message|
  product_attributes = compute_product_attributes(message)
  message.becomes(product_attributes[:type].constantize).update!(product_attributes)
end

# SimpleChatProductMessage.count
# 182

# SimpleChatProductMessage.all.reject(&:valid?)
# empty!

# Note: this created a problem because of missing content/type, be sure to address that on next data scripts
# That has been fixed in next data script, check that.

# Note: We need to solve these in a new data_script: Picture.where("url NOT LIKE ?", "%console-assets%").count

# rubocop:disable Metrics/LineLength

# SimpleChatMessage.where(type: nil).map do |message|
#   json_product_attributes = json_if_valid?(message.text)
#   next unless json_product_attributes
#   if json_product_attributes["picUrl"] =~ /youtube\.com/
#     puts "Fail url: #{json_product_attributes["picUrl"]} account_id: #{message.account_id}, simple_chat_id: #{message.simple_chat_step.simple_chat_id}"
#   end
# end

# SimpleChatMessage.where(type: nil).map do |message|
#   json_product_attributes = json_if_valid?(message.text)
#   next unless json_product_attributes
#   begin
#     open(URI.encode(json_product_attributes["picUrl"]))
#     puts "Ok url: #{json_product_attributes["picUrl"]}"
#   rescue OpenURI::HTTPError
#     puts "Fail url: #{json_product_attributes["picUrl"]} account_id: #{message.account_id}, simple_chat_id: #{message.simple_chat_step.simple_chat_id}"
#   end
# end

# SimpleChatMessage.where(type: nil).count
# 789

# After running first time:
# SimpleChatMessage.where(type: nil).count
# 490

# SimpleChatMessage.where.not(type: nil).count
# 30

# SimpleChatMessage.where.not(type: nil).pluck(:type).uniq
# ["SimpleChatProductMessage", "SimpleChatVideoMessage", "SimpleChatTextMessage"]

# SimpleChatVideoMessage.where.not(text: nil).pluck(:account_id).uniq
# account_id: 2, it's the test account

# resulting_chat_attributes = SimpleChatMessage.where(type: nil).map do |message|
#   compute_product_attributes(message)
# end

# resulting_chat_attributes.select{ |e| e[:type] == "SimpleChatProductMessage" }.length
# 178

# resulting_chat_attributes.select{ |e| e[:type] == "SimpleChatVideoMessage" }.length
# 23

# resulting_chat_attributes.select{ |e| e[:type] == "SimpleChatTextMessage" }.length
# 588

# resulting_chat_messages = SimpleChatMessage.where(type: nil).map do |message|
#   product_attributes = compute_product_attributes(message)
#   message.becomes(product_attributes[:type].constantize).assign_attributes(product_attributes)
#   message
# end

# resulting_chat_messages.map{ |e| e.type }.uniq
# ["SimpleChatTextMessage", "SimpleChatVideoMessage", "SimpleChatProductMessage"]

# resulting_chat_messages.select{ |e| e.type == "SimpleChatProductMessage" && e.display_price.blank? }

# resulting_chat_messages.select{ |e| e.type == "SimpleChatProductMessage" && e.display_price.blank? }
# account_ids = resulting_chat_messages.select{ |e| e.type == "SimpleChatProductMessage" && e.display_price.blank? }.map{ |e| e.account_id }.uniq
# Account.where(id: account_ids).pluck(:name)
# # ["Adrianadegreas", "Exitwell"]
# simple_chat_ids = resulting_chat_messages.select{ |e| e.type == "SimpleChatProductMessage" && e.display_price.blank? }.map{ |e| e.simple_chat_step.simple_chat_id }.uniq
# SimpleChat.where(id: simple_chat_ids).pluck(:name)
# # ["Homepage Scripted Chat", "Homepage"]

# rubocop:enable Metrics/LineLength
