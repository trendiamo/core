class ChangeInfluencerForeignKeyForScriptedChats < ActiveRecord::Migration[5.1]
  def change
    rename_column :scripted_chats, :influencer_id, :persona_id
  end
end
