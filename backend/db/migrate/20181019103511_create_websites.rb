class CreateWebsites < ActiveRecord::Migration[5.1]
  def change
    create_table :websites do |t|
      t.string :name, null: false, unique: true
      t.string :title, null: false
      t.string :subtitle
      t.string :hostnames, array: true, null: false

      t.timestamps
    end
  end
end
