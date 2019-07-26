class RemoveFileFormatFromPictures < ActiveRecord::Migration[5.1]
  def change
    remove_column :pictures, :file_format
  end
end
