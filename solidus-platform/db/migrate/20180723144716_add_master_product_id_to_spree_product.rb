class AddMasterProductIdToSpreeProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_products, :master_product_id, :integer
  end
end
