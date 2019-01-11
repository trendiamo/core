class RemoveDelayFromChatMessages < ActiveRecord::Migration[5.1]
  def change
    remove_column :chat_messages, :delay, :integer
  end
end
