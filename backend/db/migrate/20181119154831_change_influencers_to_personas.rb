class ChangeInfluencersToPersonas < ActiveRecord::Migration[5.1]
  def change
    rename_table :influencers, :personas
  end
end
