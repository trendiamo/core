class AddProfilePicAnimationUrlToPersonas < ActiveRecord::Migration[5.1]
  def change
    add_column :personas, :profile_pic_animation_url, :string, null: true
  end
end
