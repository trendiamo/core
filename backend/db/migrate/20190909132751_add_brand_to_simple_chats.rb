class AddBrandToSimpleChats < ActiveRecord::Migration[5.1]
  def change
    add_reference :simple_chats, :brand, foreign_key: true
  end
end
