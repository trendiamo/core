class CreateConsumerAuthTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :consumer_auth_tokens do |t|
      t.string :body
      t.references :consumer, foreign_key: true
      t.datetime :last_used_at
      t.string :ip_address
      t.string :user_agent

      t.timestamps
    end
    add_index :consumer_auth_tokens, :body
  end
end
