class AddActionTypeToOptions < ActiveRecord::Migration[5.1]
  def change
    add_column :chat_options, :action_type, :integer, null: false, default: 0, :limit => 1
    add_index :chat_options, :action_type
    change_column :chat_options, :destination_chat_step_id, :integer, null: true
  end
end
