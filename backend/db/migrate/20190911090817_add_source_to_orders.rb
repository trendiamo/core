class AddSourceToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :source, :string
    add_column :orders, :source_id, :integer, limit: 8
  end
end
