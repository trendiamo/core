class RemoveWebsiteIdFromChats < ActiveRecord::Migration[5.1]
  def change
    remove_column :chats, :website_id
  end
end
