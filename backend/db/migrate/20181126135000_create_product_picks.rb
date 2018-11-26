class CreateProductPicks < ActiveRecord::Migration[5.1]
  def change
    create_table :product_picks do |t|
      t.references :account, foreign_key: true
      t.references :spotlight, foreign_key: true
      t.string :name, null: false
      t.string :url, null: false
      t.string :description, null: false
      t.string :pic_url, null: false
      t.string :displayPrice, null: false

      t.timestamps
    end
  end
end
