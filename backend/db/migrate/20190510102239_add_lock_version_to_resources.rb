class AddLockVersionToResources < ActiveRecord::Migration[5.1]
  def change
    add_column :navigations, :lock_version, :integer, default: 1
    add_column :outros, :lock_version, :integer, default: 1
    add_column :personas, :lock_version, :integer, default: 1
    add_column :showcases, :lock_version, :integer, default: 1
    add_column :simple_chats, :lock_version, :integer, default: 1
    add_column :triggers, :lock_version, :integer, default: 1
  end
end
