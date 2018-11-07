class CreateConversations < ActiveRecord::Migration[5.1]
  def change
    create_table :conversations do |t|
      t.references :account, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.string :visitor_ref, null: false

      t.timestamps
    end
  end
end
