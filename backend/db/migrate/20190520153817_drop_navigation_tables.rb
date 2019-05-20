class DropNavigationTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :navigation_items
    drop_table :navigations
  end
end
