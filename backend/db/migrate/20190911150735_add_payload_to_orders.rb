class AddPayloadToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :payload, :json
  end
end
