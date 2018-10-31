class AddChatOptionAndReferingChatOptionToChatSteps < ActiveRecord::Migration[5.1]
  def change
    add_reference :chat_steps, :chat_option, foreign_key: true
    add_reference :chat_steps, :refering_chat_option, foreign_key: {to_table: :chat_options}
  end
end
