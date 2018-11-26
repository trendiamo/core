class CreateCurations < ActiveRecord::Migration[5.1]
  def change
    create_table :curations do |t|
      t.references :account, foreign_key: true
      t.references :persona, foreign_key: true
      t.string :title, null: false
      t.string :subtitle, null: false

      t.timestamps
    end
  end
end
