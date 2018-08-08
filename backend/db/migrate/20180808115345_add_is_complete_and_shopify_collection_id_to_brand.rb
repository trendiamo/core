class AddIsCompleteAndShopifyCollectionIdToBrand < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :is_complete, :boolean, default: false
    add_column :brands, :shopify_collection_id, :integer
  end
end
