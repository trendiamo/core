class AddIsAffiliateToAccounts < ActiveRecord::Migration[5.1]
  def change
    add_column :accounts, :is_affiliate, :boolean, default: false
  end
end
