class CreateGeneratedUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :generated_urls do |t|
      t.references :user, foreign_key: true, null: false
      t.string :url

      t.timestamps
    end
  end
end
