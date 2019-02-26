class CreateSimpleChats < ActiveRecord::Migration[5.1]
  def change
    create_table :simple_chats do |t|
      t.string :name, null: false
      t.string :title, null: false
      t.string :chat_bubble
      t.references :persona, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
