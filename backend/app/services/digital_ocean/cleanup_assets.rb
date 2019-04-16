class DigitalOcean::CleanupAssets
  def self.perform(url)
    new(url).perform
  end

  def initialize(url)
    @s3 = Aws::S3::Resource.new
    @url = url
  end

  def perform
    return unless @url.match?(/uploads.*/)

    @s3.client.delete_object(object_params(@url))
  end

  private

  def object_params(url)
    { bucket: ENV["DO_BUCKET"], key: url.match(/uploads.*/)[0] }
  end
end
