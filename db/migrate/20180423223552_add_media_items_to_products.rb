class AddMediaItemsToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :media_items, :json
  end
end
