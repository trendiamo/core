class AddOrderToProductPicks < ActiveRecord::Migration[5.1]
  def change
    add_column :product_picks, :order, :integer, null: false, default: 1
  end
end
