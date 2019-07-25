class AddFileFormatAndActiveToPictures < ActiveRecord::Migration[5.1]
  def change
    add_column :pictures, :file_format, :integer
    add_column :pictures, :active, :boolean, default: false
  end
end
