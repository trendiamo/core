class RenameDestinatonChatStep < ActiveRecord::Migration[5.1]
  def change
    rename_column :chat_options, :destinaton_chat_step_id, :destination_chat_step_id
  end
end
