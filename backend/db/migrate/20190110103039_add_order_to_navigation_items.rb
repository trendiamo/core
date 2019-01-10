class AddOrderToNavigationItems < ActiveRecord::Migration[5.1]
  def change
    add_column :navigation_items, :order, :integer, null: false, default: 1
  end
end
