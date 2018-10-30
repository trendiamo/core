class AddChatStepAndDestinationChatStepToChatOptions < ActiveRecord::Migration[5.1]
  def change
    add_reference :chat_options, :chat_step, foreign_key: true
    add_reference :chat_options, :destinaton_chat_step, foreign_key: {to_table: :chat_steps}
  end
end
