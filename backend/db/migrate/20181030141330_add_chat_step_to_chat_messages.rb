class AddChatStepToChatMessages < ActiveRecord::Migration[5.1]
  def change
    add_reference :chat_messages, :chat_step, foreign_key: true
  end
end
