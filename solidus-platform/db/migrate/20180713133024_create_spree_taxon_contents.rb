class CreateSpreeTaxonContents < ActiveRecord::Migration[5.1]
  def change
    create_table :spree_taxon_contents do |t|
      t.references :taxon, null: false
      t.boolean :about_active
      t.string :about_title
      t.boolean :about_video_active
      t.string :about_video_url
      t.string :about_image_url
      t.text :about_text
      t.string :legal_business_name
      t.string :business_location
      t.boolean :produce_on_demand
      t.string :shipping_timeframe

      t.timestamps
    end
  end
end
