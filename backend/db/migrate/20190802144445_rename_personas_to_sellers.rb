class RenamePersonasToSellers < ActiveRecord::Migration[5.1]
  def change
    rename_table :personas, :sellers
    rename_column :outros, :persona_id, :seller_id
    rename_column :showcases, :persona_id, :seller_id
    rename_column :simple_chats, :persona_id, :seller_id
    rename_column :spotlights, :persona_id, :seller_id
    rename_column :outros, :use_persona_animation, :use_seller_animation
    rename_column :showcases, :use_persona_animation, :use_seller_animation
    rename_column :simple_chats, :use_persona_animation, :use_seller_animation
    rename_column :spotlights, :use_persona_animation, :use_seller_animation
  end
end
