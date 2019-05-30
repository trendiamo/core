class RemovePictureUrlFields < ActiveRecord::Migration[5.1]
  def change
    remove_column :personas, :profile_pic_url, :string
    remove_column :product_picks, :pic_url, :string
  end
end
