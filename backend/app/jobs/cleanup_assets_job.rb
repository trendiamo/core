class CleanupAssetsJob < ApplicationJob
  queue_as :default

  def perform(url)
    DigitalOcean::CleanupAssets.perform(url)
  end
end
