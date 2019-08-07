class RenamePicturesToImages < ActiveRecord::Migration[5.1]
  def change
    rename_table :pictures, :images
    rename_column :product_picks, :pic_id, :img_id
    rename_column :product_picks, :pic_rect, :img_rect
    rename_column :sellers, :profile_pic_id, :img_id
    rename_column :sellers, :pic_rect, :img_rect
    rename_column :sellers, :profile_pic_animation_id, :animated_img_id
    rename_column :simple_chat_messages, :pic_id, :img_id
    rename_column :simple_chat_messages, :pic_rect, :img_rect
    rename_column :users, :profile_pic_url, :img_url
    rename_column :users, :pic_rect, :img_rect
  end
end
