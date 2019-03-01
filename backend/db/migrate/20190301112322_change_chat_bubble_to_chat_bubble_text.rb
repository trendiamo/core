class ChangeChatBubbleToChatBubbleText < ActiveRecord::Migration[5.1]
  def change
    rename_column :simple_chats, :chat_bubble, :chat_bubble_text
  end
end
