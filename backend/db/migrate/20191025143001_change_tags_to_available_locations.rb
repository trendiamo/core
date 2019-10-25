class ChangeTagsToAvailableLocations < ActiveRecord::Migration[5.1]
  def change
    rename_column :brands, :tags, :available_locations
  end
end
