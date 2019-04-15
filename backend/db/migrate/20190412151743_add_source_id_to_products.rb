class AddSourceIdToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :source_id, :integer, null: false, limit: 8
  end
end
