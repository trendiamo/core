class CreateAffiliations < ActiveRecord::Migration[5.1]
  def change
    create_table :affiliations do |t|
      t.references :account, foreign_key: true
      t.references :user, foreign_key: true
      t.string :token
    end
  end
end
