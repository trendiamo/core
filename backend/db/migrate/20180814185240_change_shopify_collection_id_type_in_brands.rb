class ChangeShopifyCollectionIdTypeInBrands < ActiveRecord::Migration[5.1]
  def change
    change_column :brands, :shopify_collection_id, :string
  end
end
