class RemoveAuthTokens < ActiveRecord::Migration[5.1]
  def change
    drop_table :auth_tokens
  end
end
