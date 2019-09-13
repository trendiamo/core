class AddTrackingOrdersToShops < ActiveRecord::Migration[5.2]
  def change
    add_column :shops, :tracking_orders, :boolean, default: :true
  end
end
