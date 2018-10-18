class CreateWebsites < ActiveRecord::Migration[5.1]
  def change
    create_table :websites do |t|
      t.string :name, null: false, unique: true
      t.string :title, null: false
      t.string :subtitle
      t.json :hostnames, array: true, default: [], null: false

      t.timestamps
    end
  end
end
