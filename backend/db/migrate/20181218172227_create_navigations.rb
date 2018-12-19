class CreateNavigations < ActiveRecord::Migration[5.1]
  def change
    create_table :navigations do |t|
      t.references :account, foreign_key: true
      t.string :name
      t.references :persona, foreign_key: true
      t.timestamps
    end
  end
end
