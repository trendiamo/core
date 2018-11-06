module CleanupAssets
  extend ActiveSupport::Concern

  included do
    after_save -> { cleanup_assets_after_save }
    after_destroy -> { cleanup_assets_after_destroy }
  end

  def cleanup_assets_after_save
    return unless saved_change_to_attribute?(:profile_pic_url) && attribute_before_last_save(:profile_pic_url)
    CleanupAssetsJob.perform_later(attribute_before_last_save(:profile_pic_url))
  end

  def cleanup_assets_after_destroy
    return unless attribute_in_database(:profile_pic_url)
    CleanupAssetsJob.perform_later(attribute_in_database(:profile_pic_url))
  end
end
