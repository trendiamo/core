class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.string :path, null: false
      t.string :title, null: false
      t.references :influencer, foreign_key: true
      t.references :website, foreign_key: true
      t.timestamps
    end
  end
end
