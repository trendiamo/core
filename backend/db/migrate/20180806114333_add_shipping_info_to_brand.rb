class AddShippingInfoToBrand < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :domestic_shipping_time, :string
    add_column :brands, :eu_shipping_time, :string
    add_column :brands, :outside_eu_shipping_time, :string
    add_column :brands, :general_shipping_info, :text
    add_column :brands, :trendiamo_shipping_info, :text
  end
end
