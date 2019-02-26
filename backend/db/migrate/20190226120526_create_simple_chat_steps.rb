class CreateSimpleChatSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :simple_chat_steps do |t|
      t.string :key, default: "default", null: false
      t.integer :order, null: false, default: 1
      t.references :simple_chat, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
