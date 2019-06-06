class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.integer :role, default: 0
      t.references :user, foreign_key: true
      t.references :account, foreign_key: true
    end
  end
end
