class CreateInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :interests do |t|
      t.references :account, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
