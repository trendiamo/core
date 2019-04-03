class Aws::S3::DuplicatePictures
  def initialize(account, cloned_account)
    @account = account
    @cloned_account = cloned_account
    @bucket = Aws::S3::Bucket.new(ENV["DO_BUCKET"])
  end

  def perform
    bucket_copy_object
  end

  private

  def bucket_copy_object
    @cloned_account.pictures.each_with_index do |picture, index|
      object_path = path_without_slash(URI(picture.url))
      source_path = path_without_slash(URI(@account.pictures[index].url))
      object = @bucket.object(object_path)
      object.copy_from(@bucket.object(source_path))
    end
  end

  def duplicate_pic_url(picture)
    uri = URI(picture.url)
    direcories_array = path_without_slash(uri).split("/", 4)
    direcories_array[2] = SecureRandom.hex(4)
    "#{uri.scheme}://#{uri.host}/#{direcories_array.join('/')}"
  end

  def path_without_slash(uri)
    uri.path[1..-1]
  end
end
