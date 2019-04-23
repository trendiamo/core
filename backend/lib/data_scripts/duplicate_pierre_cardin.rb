old_account_to_keep = Account.find_by(name: "PierreCardinGermanyPreAsmt")
new_account_to_remove = Account.find_by(name: "PierreCardinGermany")
new_account_to_remove.destroy!
old_account_to_keep.duplicate("PierreCardinGermany", %w[www.pierre-cardin2.com])

# fix for unexpected broken pictures:
old_account_to_keep = Account.find_by(name: "PierreCardinGermanyPreAsmt")
new_account = Account.find_by(name: "PierreCardinGermany")
bucket = Aws::S3::Bucket.new(ENV["DO_BUCKET"])
new_account.pictures.map do |picture|
  filename = picture.url.split("/").last
  new_path = "uploads/account-#{new_account.id}/#{SecureRandom.hex(4)}-#{filename}"
  old_url = old_account_to_keep.pictures.where("url LIKE ?", "%#{filename}").first.url
  old_path = old_url.gsub("https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/", "")
  bucket.object(new_path).copy_from(bucket: ENV["DO_BUCKET"], key: old_path, acl: "public-read")
  picture.update!(url: "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/#{new_path}")
end
