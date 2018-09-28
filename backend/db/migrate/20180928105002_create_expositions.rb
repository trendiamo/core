class CreateExpositions < ActiveRecord::Migration[5.1]
  def change
    create_table :expositions do |t|
      t.string :domain
      t.string :cta_text
      t.string :cta_url
      t.string :description
      t.references :influencer, foreign_key: true

      t.timestamps
    end
  end
end
