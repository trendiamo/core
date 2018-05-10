class CreateCollectionModals < ActiveRecord::Migration[5.1]
  def change
    create_table :collection_modals do |t|
      t.references :collection, foreign_key: true, null: false
      t.string :logo_pic_url, null: false
      t.string :cover_pic_url, null: false
      t.string :title, null: false
      t.string :text, null: false
      t.string :cta_text, null: false
    end
  end
end
