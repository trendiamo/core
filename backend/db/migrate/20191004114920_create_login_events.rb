class CreateLoginEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :login_events do |t|
      t.references :user, foreign_key: true
      t.datetime :timestamp, null: false
      t.string :domain, null: false

      t.timestamps
    end
  end
end
