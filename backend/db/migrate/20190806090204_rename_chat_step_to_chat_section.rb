class RenameChatStepToChatSection < ActiveRecord::Migration[5.1]
  def change
    rename_table :simple_chat_steps, :simple_chat_sections
    rename_column :simple_chat_messages, :simple_chat_step_id, :simple_chat_section_id
  end
end
