class AllowProductsWithoutUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:products, :user_id, true)
  end
end
