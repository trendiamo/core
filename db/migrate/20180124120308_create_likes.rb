class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.string :consumer_ref
      t.string :product_ref

      t.timestamps
    end
  end
end
