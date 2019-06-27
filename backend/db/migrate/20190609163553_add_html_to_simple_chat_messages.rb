class AddHtmlToSimpleChatMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :simple_chat_messages, :html, :string
  end
end
