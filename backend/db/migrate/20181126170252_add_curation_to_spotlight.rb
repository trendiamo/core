class AddCurationToSpotlight < ActiveRecord::Migration[5.1]
  def change
    add_reference :spotlights, :curation, foreign_key: true
  end
end
