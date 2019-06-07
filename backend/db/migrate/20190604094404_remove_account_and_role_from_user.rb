class RemoveAccountAndRoleFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :account_id, :references
    remove_column :users, :role, :integer
  end
end
