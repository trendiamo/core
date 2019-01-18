class AddOrderToChatOptions < ActiveRecord::Migration[5.1]
  def change
    add_column :chat_options, :order, :integer, null: false, default: 1
  end
end
