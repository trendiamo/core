class CreateWebsiteSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :website_settings do |t|
      t.references :account, foreign_key: true, null: false
      t.references :website, foreign_key: true, null: false
      t.string :theme_color, default: '#232323'
      t.integer :text_color, default: 0
      t.boolean :round_edges, null: false, default: true

      t.timestamps
    end
  end
end
