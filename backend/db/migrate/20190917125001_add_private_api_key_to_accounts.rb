class AddPrivateApiKeyToAccounts < ActiveRecord::Migration[5.1]
  def change
    add_column :accounts, :private_api_key, :string
    add_index :accounts, :private_api_key, unique: true
  end
end
