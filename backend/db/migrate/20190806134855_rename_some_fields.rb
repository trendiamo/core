class RenameSomeFields < ActiveRecord::Migration[5.1]
  def change
    rename_column :outros, :chat_bubble_text, :teaser_message
    rename_column :showcases, :title, :heading
    rename_column :showcases, :subtitle, :subheading
    rename_column :showcases, :chat_bubble_text, :teaser_message
    rename_column :showcases, :chat_bubble_extra_text, :extra_teaser_message
    rename_column :simple_chats, :title, :heading
    rename_column :simple_chats, :chat_bubble_text, :teaser_message
    rename_column :simple_chats, :chat_bubble_extra_text, :extra_teaser_message
  end
end
