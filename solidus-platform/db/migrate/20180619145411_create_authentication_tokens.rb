class CreateAuthenticationTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :authentication_tokens do |t|
      t.string :body
      t.references :user, foreign_key: { to_table: :spree_users }
      t.datetime :last_used_at
      t.integer :expires_in
      t.string :ip_address
      t.string :user_agent

      t.timestamps
    end
    add_index :authentication_tokens, :body
  end
end
