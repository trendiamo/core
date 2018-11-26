class CreateSpotlights < ActiveRecord::Migration[5.1]
  def change
    create_table :spotlights do |t|
      t.references :account, foreign_key: true
      t.references :persona, foreign_key: true
      t.string :text, null: false

      t.timestamps
    end
  end
end
