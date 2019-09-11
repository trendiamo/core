class AddCurrencyToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :currency, :string, null: false, default: "eur"
  end
end
