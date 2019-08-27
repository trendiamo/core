class AddAffiliateRoleToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :affiliate_role, :integer, default: 0, null: false
  end
end
