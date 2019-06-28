class RemoveTextFromSimpleChatMessages < ActiveRecord::Migration[5.1]
  def change
    remove_column :simple_chat_messages, :text, :string
  end
end
