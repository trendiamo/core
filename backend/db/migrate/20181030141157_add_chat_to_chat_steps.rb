class AddChatToChatSteps < ActiveRecord::Migration[5.1]
  def change
    add_reference :chat_steps, :chat, foreign_key: true
  end
end
