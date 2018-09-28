class CreateInstagramPosts < ActiveRecord::Migration[5.1]
  def change
    create_table :instagram_posts do |t|
      t.string :url

      t.timestamps
    end
  end
end
