class CreateExpositionsVideosJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :expositions, :videos do |t|
      t.index :exposition_id
      t.index :video_id
    end
  end
end
