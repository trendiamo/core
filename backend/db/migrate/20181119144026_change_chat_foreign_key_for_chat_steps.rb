class ChangeChatForeignKeyForChatSteps < ActiveRecord::Migration[5.1]
  def change
    rename_column :chat_steps, :chat_id, :scripted_chat_id
  end
end
