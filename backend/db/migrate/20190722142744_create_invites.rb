class CreateInvites < ActiveRecord::Migration[5.1]
  def change
    create_table :invites do |t|
      t.string :email, null: false
      t.string :role, null: false
      t.references :sender
      t.references :recipient
      t.references :account, foreign_key: true
      t.datetime :accepted_at
      t.string :token

      t.timestamps
    end
  end
end
