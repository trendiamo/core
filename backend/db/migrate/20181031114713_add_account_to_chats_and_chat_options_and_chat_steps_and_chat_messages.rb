class AddAccountToChatsAndChatOptionsAndChatStepsAndChatMessages < ActiveRecord::Migration[5.1]
  def change
    add_reference :chats, :account, foreign_key: true
    add_reference :chat_options, :account, foreign_key: true
    add_reference :chat_steps, :account, foreign_key: true
    add_reference :chat_messages, :account, foreign_key: true
  end
end
