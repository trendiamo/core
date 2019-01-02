class RenameCurationsToShowcases < ActiveRecord::Migration[5.1]
  def change
    rename_table :curations, :showcases
    rename_column :spotlights, :curation_id, :showcase_id
    reversible do |dir|
      dir.up { Trigger.where(flow_type: "Curation").update_all(flow_type: "Showcase") }
      dir.down { Trigger.where(flow_type: "Showcase").update_all(flow_type: "Curation") }
    end
  end
end
