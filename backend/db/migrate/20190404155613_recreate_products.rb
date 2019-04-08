class RecreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.references :account, foreign_key: true
      t.string :name, null: false
      t.string :url, null: false
      t.string :source, null: false
      t.column :payload, :json
    end
  end
end
