class ChangeFileFormatOnPictures < ActiveRecord::Migration[5.1]
  def change
    change_column_null :pictures, :file_format, false
  end
end
