class CreateTriggers < ActiveRecord::Migration[5.1]
  def change
    create_table :triggers do |t|
      t.integer :order, null: false
      t.string :url_matchers, array: true, null: false
      t.references :flow, polymorphic: true, index: true

      t.timestamps
    end

    add_index :triggers, :url_matchers, using: "gin"
  end
end
