class RemoveExpositionsAndInfluencersAndIntagramPostsTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :influencers, force: :cascade
    drop_table :expositions, force: :cascade
    drop_table :instagram_posts, force: :cascade
    drop_table :expositions_instagram_posts, force: :cascade
    drop_table :expositions_videos, force: :cascade
  end
end
