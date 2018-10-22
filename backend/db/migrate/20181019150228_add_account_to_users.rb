class AddAccountToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :account, foreign_key: true, null: false
  end
end
