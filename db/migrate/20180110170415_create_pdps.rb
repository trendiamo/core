class CreatePdps < ActiveRecord::Migration[5.1]
  def change
    create_table :pdps do |t|
      t.references :influencer
      t.string :title
      t.text :description
      t.timestamp :start_at
      t.timestamp :end_at

      t.timestamps
    end
  end
end
