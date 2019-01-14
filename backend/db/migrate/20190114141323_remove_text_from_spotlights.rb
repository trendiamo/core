class RemoveTextFromSpotlights < ActiveRecord::Migration[5.1]
  def change
    remove_column :spotlights, :text, :string
  end
end
