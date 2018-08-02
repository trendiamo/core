class CreateBrands < ActiveRecord::Migration[5.1]
  def change
    create_table :brands do |t|
      t.string :name
      t.string :legal_address_city
      t.string :legal_address_number
      t.string :legal_address_postal_code
      t.string :legal_address_street
      t.string :legal_address_country
      t.string :legal_name
      t.string :logo_url

      t.timestamps
    end
  end
end
