class AddOrderToBrands < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :order, :integer, null: false, default: 1
  end
end
