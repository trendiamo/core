class RemoveUnusedFields < ActiveRecord::Migration[5.1]
  def change
    remove_column :chat_steps, :chat_option_id, :bigint
    remove_column :chat_steps, :refering_chat_option_id, :bigint
  end
end
