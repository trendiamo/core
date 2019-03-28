class AddPicReferences < ActiveRecord::Migration[5.1]
  def change
    add_reference :navigation_items, :pic
    add_foreign_key :navigation_items, :pictures, column: :pic_id

    add_reference :personas, :profile_pic
    add_foreign_key :personas, :pictures, column: :profile_pic_id
    add_reference :personas, :profile_pic_animation
    add_foreign_key :personas, :pictures, column: :profile_pic_animation_id

    add_reference :product_picks, :pic
    add_foreign_key :product_picks, :pictures, column: :pic_id
  end
end
