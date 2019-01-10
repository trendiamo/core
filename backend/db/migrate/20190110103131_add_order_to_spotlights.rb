class AddOrderToSpotlights < ActiveRecord::Migration[5.1]
  def change
    add_column :spotlights, :order, :integer, null: false, default: 1
  end
end
