class AddPreviewModeToWebsites < ActiveRecord::Migration[5.1]
  def change
    add_column :websites, :preview_mode, :boolean, default: :false
  end
end
