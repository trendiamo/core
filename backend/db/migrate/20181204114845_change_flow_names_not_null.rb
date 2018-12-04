class ChangeFlowNamesNotNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :curations, :name, false
    change_column_null :scripted_chats, :name, false
    change_column_null :outros, :name, false
  end
end
