class ChangeOwnerIdNotNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :outros, :owner_id, false
    change_column_null :simple_chats, :owner_id, false
    change_column_null :showcases, :owner_id, false
  end
end
