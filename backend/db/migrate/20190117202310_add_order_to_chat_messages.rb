class AddOrderToChatMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :chat_messages, :order, :integer, null: false, default: 1
  end
end
