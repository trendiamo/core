class CreateTaggedProductsClients < ActiveRecord::Migration[5.1]
  def change
    create_table :tagged_products_clients do |t|
      t.string :hostname
      t.json :payload

      t.timestamps
    end
  end
end
