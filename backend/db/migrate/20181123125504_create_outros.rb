class CreateOutros < ActiveRecord::Migration[5.1]
  def change
    create_table :outros do |t|
      t.references :persona, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
