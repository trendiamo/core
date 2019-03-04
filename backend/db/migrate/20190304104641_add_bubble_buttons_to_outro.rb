class AddBubbleButtonsToOutro < ActiveRecord::Migration[5.1]
  def change
    add_column :outros, :chat_bubble_button_yes, :string
    add_column :outros, :chat_bubble_button_no, :string
    remove_column :outros, :chat_bubble_extra_text
  end
end
