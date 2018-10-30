class CreateChatMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_messages do |t|
      t.integer :delay, null: false
      t.text :text, null: false

      t.timestamps
    end
  end
end
