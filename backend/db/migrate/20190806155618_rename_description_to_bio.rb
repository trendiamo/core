class RenameDescriptionToBio < ActiveRecord::Migration[5.1]
  def change
    rename_column :sellers, :description, :bio
  end
end
