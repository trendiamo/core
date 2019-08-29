class AddRequestedUpgradeToSellerAtToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :requested_upgrade_to_seller_at, :datetime
  end
end
