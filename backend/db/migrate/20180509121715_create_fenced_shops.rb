class CreateFencedShops < ActiveRecord::Migration[5.1]
  def change
    create_table :fenced_shops do |t|
      t.string :domain_name
      t.string :logo_pic_url
      t.string :cover_pic_url
      t.string :title
      t.string :text
      t.string :cta_text
      t.string :favicon_url

      t.timestamps
    end
  end
end
