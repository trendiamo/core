class AddExternalProductUrlToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :external_product_url, :string
  end
end
