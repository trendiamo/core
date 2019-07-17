class RemoveProfilePicAnimationUrlFromPersonas < ActiveRecord::Migration[5.1]
  def change
    remove_column :personas, :profile_pic_animation_url, :string
  end
end
