class CreateNavigationItems < ActiveRecord::Migration[5.1]
  def change
    create_table :navigation_items do |t|
      t.references :account, foreign_key: true
      t.references :navigation, foreign_key: true
      t.string :text
      t.string :url
      t.string :pic_url
      t.timestamps
    end
  end
end
