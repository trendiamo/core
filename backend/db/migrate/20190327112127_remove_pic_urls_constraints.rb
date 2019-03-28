class RemovePicUrlsConstraints < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:product_picks, :pic_url, true)
    change_column_null(:personas, :profile_pic_url, true)
  end
end
