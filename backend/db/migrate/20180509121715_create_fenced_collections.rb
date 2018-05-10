class CreateFencedCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :fenced_collections do |t|
      t.references :collection, foreign_key: true, null: false
      t.string :domain_name, null: false
      t.string :favicon_url

      t.timestamps
    end
  end
end
