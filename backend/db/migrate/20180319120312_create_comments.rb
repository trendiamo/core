class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.references :user, foreign_key: true, null: false
      t.string :product_ref, null: false
      t.text :content, null: false
      t.boolean :pinned, default: false, null: false
      t.integer :upvotes_count, default: 0, null: false
      t.integer :inappropriate_flags_count, default: 0, null: false
      t.timestamp :removed_at

      t.timestamps
    end
  end
end
