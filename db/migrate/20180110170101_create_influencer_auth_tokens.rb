class CreateInfluencerAuthTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :influencer_auth_tokens do |t|
      t.string :body
      t.references :influencer, foreign_key: true
      t.datetime :last_used_at
      t.string :ip_address
      t.string :user_agent

      t.timestamps
    end
  end
end
