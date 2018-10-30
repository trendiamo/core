class CreateChatOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_options do |t|
      t.string :text, null: false

      t.timestamps
    end
  end
end
