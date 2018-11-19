class RemovePathFromScriptedChats < ActiveRecord::Migration[5.1]
  def change
    remove_column :scripted_chats, :path, :string
  end
end
