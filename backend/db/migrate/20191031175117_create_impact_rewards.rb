class CreateImpactRewards < ActiveRecord::Migration[5.1]
  def change
    create_table :impact_rewards do |t|
      t.references :brand, foreign_key: true
      t.string :target_revenue_currency, null: false
      t.integer :target_revenue_in_cents, null: false, default: 0
      t.integer :impact_points_in_cents, null: false, default: 0

      t.timestamps
    end
  end
end
