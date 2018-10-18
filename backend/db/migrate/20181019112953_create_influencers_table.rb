class CreateInfluencersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :influencers do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :profile_pic_url, null: false

      t.timestamps
    end
  end
end
