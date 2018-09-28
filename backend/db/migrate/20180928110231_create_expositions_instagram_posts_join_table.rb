class CreateExpositionsInstagramPostsJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :expositions, :instagram_posts do |t|
      t.index :exposition_id
      t.index :instagram_post_id
    end
  end
end
