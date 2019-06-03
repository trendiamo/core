class AddGroupWithAdjacentToSimpleChatMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :simple_chat_messages, :group_with_adjacent, :boolean, default: false
  end
end
