class CreateImpactPointsTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :impact_points_transactions do |t|
      t.references :user, foreign_key: true
      t.string :transaction_type, null: false
      t.integer :amount_in_cents, null: false
      t.integer :old_balance_in_cents, null: false
      t.integer :new_balance_in_cents, null: false

      t.timestamps
    end
  end
end
