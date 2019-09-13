class ChangeCommissionRateTypeInOrders < ActiveRecord::Migration[5.1]
  def change
    change_column :orders, :commission_rate, 'DECIMAL USING CAST(commission_rate AS DECIMAL(10,4))'
  end
end
