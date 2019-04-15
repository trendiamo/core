class ChangeDefaultOrder < ActiveRecord::Migration[5.1]
  def change
    change_column_default(:triggers, :order, from: 1, to: nil)
    change_column_default(:navigation_items, :order, from: 1, to: nil)
    change_column_default(:product_picks, :order, from: 1, to: nil)
    change_column_default(:simple_chat_messages, :order, from: 1, to: nil)
    change_column_default(:simple_chat_steps, :order, from: 1, to: nil)
    change_column_default(:spotlights, :order, from: 1, to: nil)
    change_column_null :triggers, :order, true
    change_column_null :navigation_items, :order, true
    change_column_null :product_picks, :order, true
    change_column_null :simple_chat_messages, :order, true
    change_column_null :simple_chat_steps, :order, true
    change_column_null :spotlights, :order, true
  end
end
