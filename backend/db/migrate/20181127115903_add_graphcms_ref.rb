class AddGraphcmsRef < ActiveRecord::Migration[5.1]
  def change
    add_column :curations, :graphcms_ref, :string
    add_column :outros, :graphcms_ref, :string
    add_column :personas, :graphcms_ref, :string
    add_column :scripted_chats, :graphcms_ref, :string
  end
end
