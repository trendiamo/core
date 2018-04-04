class CreateCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :collections do |t|
      t.string :handle, null: false, unique: true
      t.string :title, null: false
      t.string :type, null: false
      t.string :profile_pic_url, null: false
      t.string :cover_pic_url, null: false
      t.text :description, null: false
    end
  end
end
