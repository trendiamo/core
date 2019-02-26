class CreateSimpleChatMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :simple_chat_messages do |t|
      t.string :text, null: false
      t.integer :order, null: false, default: 1
      t.references :simple_chat_step, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
