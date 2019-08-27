class AddSocialMediaUrlToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :social_media_url, :string
  end
end
