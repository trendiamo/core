class ChangeChatsToScriptedChats < ActiveRecord::Migration[5.1]
  def change
    rename_table :chats, :scripted_chats
  end
end
