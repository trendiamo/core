class AddPicRectToResources < ActiveRecord::Migration[5.1]
  def change
    add_column :personas, :pic_rect, :json, default: {}
    add_column :product_picks, :pic_rect, :json, default: {}
    add_column :simple_chat_messages, :pic_rect, :json, default: {}
    add_column :users, :pic_rect, :json, default: {}
  end
end
