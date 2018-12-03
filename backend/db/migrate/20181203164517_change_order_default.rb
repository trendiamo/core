class ChangeOrderDefault < ActiveRecord::Migration[5.1]
  def change
    change_column_default :triggers, :order, 1
  end
end
