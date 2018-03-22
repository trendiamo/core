class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.references :user, foreign_key: true, null: false
      t.string :product_ref, null: false
      t.integer :likes_count, null: false, default: 0

      t.timestamps
    end
  end
end
