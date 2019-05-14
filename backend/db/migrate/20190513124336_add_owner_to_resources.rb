class AddOwnerToResources < ActiveRecord::Migration[5.1]
  def change
    add_reference :outros, :owner, references: :users, index: true
    add_foreign_key :outros, :users, column: :owner_id
    add_reference :showcases, :owner, references: :users, index: true
    add_foreign_key :showcases, :users, column: :owner_id
    add_reference :simple_chats, :owner, references: :users, index: true
    add_foreign_key :simple_chats, :users, column: :owner_id
  end
end
