class AddAccountToInfluencers < ActiveRecord::Migration[5.1]
  def change
    add_reference :influencers, :account, foreign_key: true, null: false
  end
end
