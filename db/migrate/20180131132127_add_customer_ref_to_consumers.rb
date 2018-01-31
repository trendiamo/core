class AddCustomerRefToConsumers < ActiveRecord::Migration[5.1]
  def change
    add_column :consumers, :customer_ref, :string
  end
end
