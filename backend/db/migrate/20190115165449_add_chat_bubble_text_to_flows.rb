class AddChatBubbleTextToFlows < ActiveRecord::Migration[5.1]
  def change
    add_column :showcases, :chat_bubble_text, :string
    add_column :navigations, :chat_bubble_text, :string
    add_column :scripted_chats, :chat_bubble_text, :string
    add_column :outros, :chat_bubble_text, :string
  end
end
