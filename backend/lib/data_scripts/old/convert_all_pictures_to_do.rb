# Picture.where("url NOT LIKE ?", "%console-assets%").count
# => 10

# Picture.where("url NOT LIKE ?", "%console-assets%").pluck(:account_id).uniq
# => [4, 15, 11]

# Account.where(id: [4, 15, 11]).pluck(:name)
# => ["Corinthians", "Adrianadegreas", "Exitwell"]

# Picture.where("url NOT LIKE ?", "%console-assets%").pluck(:url)
# http://static.shoptimao.com.br/produtos/camiseta-corinthians-cassio-logo-masculina/14/D65-1724-014/D65-1724-014_zoom1.jpg
# https://static.shoptimao.com.br/produtos/camisa-corinthians-ii-1819-n-38-pedrinho-torcedor-nike-masculina/06/D12-9947-006/D12-9947-006_zoom1.jpg
# https://static.shoptimao.com.br/produtos/camiseta-corinthians-pedrinho-logo-masculina/14/D65-1726-014/D65-1726-014_zoom1.jpg
# https://static.shoptimao.com.br/produtos/calcao-corinthians-nike-masculino/26/D12-9825-026/D12-9825-026_zoom1.jpg
# https://static.shoptimao.com.br/produtos/luva-de-goleiro-nike-match-masculina/08/HZM-0281-008/HZM-0281-008_zoom1.jpg
# https://static.shoptimao.com.br/produtos/camisa-corinthians-ii-1819-n-10-jadson-torcedor-nike-masculina/06/D12-9937-006/D12-9937-006_zoom1.jpg
# https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-1718-n-10-jadson-torcedor-nike-masculina/36/D12-9027-236/D12-9027-236_zoom1.jpg
# https://www.exitwell.com/2017/wp-content/uploads/2019/02/EW-magazine-23-2019-1.jpg
# https://cdn.shopify.com/s/files/1/1618/5333/products/V19_MATC0225_07293_4de3a565-4f11-4f3a-9d9d-03cb86617790_large.jpg?v=1542920479
# https://cdn.shopify.com/s/files/1/1618/5333/products/Adriana_Degreas_S190267_large.jpg?v=1543254416

# Picture.where("url NOT LIKE ?", "%console-assets%").map do |picture|
#   URI(picture.url).path.split("/").last
# end
#
# Picture.where("url NOT LIKE ?", "%console-assets%").map do |picture|
#   digital_ocean_uri(picture).to_s
# end

require "open-uri"

@client = Aws::S3::Client.new(access_key_id: ENV["DO_SPACES_KEY_ID"], secret_access_key: ENV["DO_SECRET_ACCESS_KEY"])

def digital_ocean_uri(picture)
  filename = URI(picture.url).path.split("/").last
  prefix = "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}"
  URI("#{prefix}/uploads/account-#{picture.account_id}/#{SecureRandom.hex(4)}-#{filename}")
end

def download_file(url)
  open(URI.encode(url)) # rubocop:disable Lint/UriEscapeUnescape, Security/Open
end

def upload_file!(pic_url, new_pic_uri)
  body = download_file(pic_url)
  content_type = body.meta["content-type"]
  bucket = ENV["DO_BUCKET"]
  destination_key = new_pic_uri.path[1..-1]
  @client.put_object(bucket: bucket, key: destination_key, body: body, content_type: content_type, acl: "public-read")
end

Picture.where("url NOT LIKE ?", "%console-assets%").map do |picture|
  new_pic_uri = digital_ocean_uri(picture)
  upload_file!(picture.url, new_pic_uri)
  picture.update!(url: new_pic_uri.to_s)
end

# also, we could do something about the "upload" pictures, but we first have to solve the app logic on it to use the
# filename if present and "picture.<ext>" otherwise.
