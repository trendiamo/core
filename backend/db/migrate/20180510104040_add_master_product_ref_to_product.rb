class AddMasterProductRefToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :master_product_ref, :string, null: false
  end
end
