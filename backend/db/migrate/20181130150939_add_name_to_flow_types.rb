class AddNameToFlowTypes < ActiveRecord::Migration[5.1]
  def change
    add_column :curations, :name, :string
    add_column :outros, :name, :string
    add_column :scripted_chats, :name, :string
  end
end
