class AddProfilePicAnimationToPersonas < ActiveRecord::Migration[5.1]
  def change
    add_reference :personas, :profile_pic_animation
    add_foreign_key :personas, :pictures, column: :profile_pic_animation_id
  end
end
