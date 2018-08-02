class AddShortDescriptionAndLongDescriptionAndHeaderContentToBrand < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :short_description, :text
    add_column :brands, :long_description, :text
    add_column :brands, :header_content_photo, :string
    add_column :brands, :header_content_video, :string
  end
end
