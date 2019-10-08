class AddIsPreviewToBrands < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :is_preview, :boolean, default: false, null: false
  end
end
