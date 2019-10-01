class CreateAffiliateLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :affiliate_links do |t|
      t.references :affiliation, foreign_key: true
      t.string :url, null: false, unique: true
      t.boolean :default_link, default: false
      t.timestamps
    end

    add_index :affiliate_links, :url, unique: true
  end
end
