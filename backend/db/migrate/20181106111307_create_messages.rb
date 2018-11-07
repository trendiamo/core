class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :account, foreign_key: true, null: false
      t.references :conversation, foreign_key: true, null: false
      t.references :user, foreign_key: true
      t.string :visitor_ref
      t.text :body

      t.timestamps
    end
  end
end
