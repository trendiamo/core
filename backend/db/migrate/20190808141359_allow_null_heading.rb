class AllowNullHeading < ActiveRecord::Migration[5.1]
  def change
    change_column_null :simple_chats, :heading, true
  end
end
