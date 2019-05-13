class AddOwnerToResources < ActiveRecord::Migration[5.1]
  def change
    add_reference :showcases, :owner, foreign_key: {to_table: :users}, null: false
    add_reference :outros, :owner, foreign_key: {to_table: :users}, null: false
    add_reference :simple_chats, :owner, foreign_key: {to_table: :users}, null: false
  end
end
