class AddFieldsToSimpleChatMessages < ActiveRecord::Migration[5.1]
  def change
    change_column_null :simple_chat_messages, :text, true
    add_column :simple_chat_messages, :type, :string, default: "SimpleChatTextMessage"
    add_column :simple_chat_messages, :title, :string
    add_column :simple_chat_messages, :url, :string
    add_column :simple_chat_messages, :display_price, :string
    add_column :simple_chat_messages, :video_url, :string
    add_reference :simple_chat_messages, :pic
    add_foreign_key :simple_chat_messages, :pictures, column: :pic_id
  end
end
