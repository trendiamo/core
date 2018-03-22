class ChangeLikes < ActiveRecord::Migration[5.1]
  def up
    drop_table :likes, if_exists: true
    create_table :likes do |t|
      t.references :user, foreign_key: true, null: false
      t.references :product, foreign_key: true, null: false

      t.timestamps
    end
  end

  def down
    drop_table :likes
  end
end
