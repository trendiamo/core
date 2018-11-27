class RenameDisplayPriceColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :product_picks, :displayPrice, :display_price
  end
end
