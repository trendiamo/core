class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.references :account, foreign_key: true
      t.references :seller, references: :user, foreign_key: { to_table: :users}
      t.datetime :captured_at, null: false
      t.string :commission_rate, null: false
      t.integer :amount_in_cents, null: false
      t.string :currency, null: false
      t.json :products

      t.timestamps
    end
  end
end
