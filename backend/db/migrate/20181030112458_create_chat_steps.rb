class CreateChatSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_steps do |t|

      t.timestamps
    end
  end
end
