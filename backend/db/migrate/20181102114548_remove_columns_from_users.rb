class RemoveColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :website_ref
    remove_column :users, :exposition_hostname
  end
end
