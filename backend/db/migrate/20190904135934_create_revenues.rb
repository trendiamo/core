class CreateRevenues < ActiveRecord::Migration[5.1]
  def change
    create_table :revenues do |t|
      t.references :account, foreign_key: true
      t.references :user, foreign_key: true
      t.datetime :captured_at, null: false
      t.string :commission_value, null: false
      t.json :values

      t.timestamps
    end
  end
end
