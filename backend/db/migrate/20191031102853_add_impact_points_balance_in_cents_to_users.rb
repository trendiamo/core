class AddImpactPointsBalanceInCentsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :impact_points_balance_in_cents, :integer, null: false, default: 0
  end
end
