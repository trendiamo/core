class AllowNullDisplayPriceInProductPicks < ActiveRecord::Migration[5.1]
  def change
    change_column_null :product_picks, :display_price, true
  end
end
