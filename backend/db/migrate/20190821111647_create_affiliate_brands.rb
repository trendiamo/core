class CreateAffiliateBrands < ActiveRecord::Migration[5.1]
  def change
    create_table :brands do |t|
      t.string :name, null: false
      t.string :logo_url
      t.text :description
      t.references :account, foreign_key: true
    end
  end
end
