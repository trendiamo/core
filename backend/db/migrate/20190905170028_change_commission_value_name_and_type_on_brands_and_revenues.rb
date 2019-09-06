class ChangeCommissionValueNameAndTypeOnBrandsAndRevenues < ActiveRecord::Migration[5.1]
  def change
    rename_column :brands, :commission_value, :commission_rate
    rename_column :revenues, :commission_value, :commission_rate
    change_column :brands, :commission_rate, 'DECIMAL USING CAST(replace(commission_rate,\'%\',\'\') AS DECIMAL(10,4)) / 100'
    change_column :revenues, :commission_rate, 'DECIMAL USING CAST(replace(commission_rate,\'%\',\'\') AS DECIMAL(10,4)) / 100'
  end
end
