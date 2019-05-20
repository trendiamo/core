class ChangeSimpleChatMessageTypeDefaultNull < ActiveRecord::Migration[5.1]
  def change
    change_column_default :simple_chat_messages, :type, nil
  end
end
