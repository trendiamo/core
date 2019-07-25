def find_content_type(url)
  uri_url = URI(URI::DEFAULT_PARSER.escape(url))
  Net::HTTP.start(uri_url.host, uri_url.port, use_ssl: true) do |http|
    http.use_ssl = true if url.starts_with?("https")
    headers = http.head(uri_url.path).to_hash
    headers["content-type"][0]
  end
end

def file_format(content_type)
  result = content_type.gsub("image/", "")
  result == "jpg" ? "jpeg" : result
end

def update_file_format(picture)
  pic_url = picture.url
  content_type = find_content_type(pic_url)
  picture.update!(file_format: file_format(content_type))
  picture
end

Picture.where(file_format: nil).each do |picture|
  update_file_format(picture)
  picture.set_active
end
