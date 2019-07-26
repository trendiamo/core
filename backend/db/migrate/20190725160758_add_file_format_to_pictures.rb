class AddFileFormatToPictures < ActiveRecord::Migration[5.1]
  def change
    add_column :pictures, :file_format, :string
  end
end
