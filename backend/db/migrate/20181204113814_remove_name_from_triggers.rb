class RemoveNameFromTriggers < ActiveRecord::Migration[5.1]
  def change
    remove_column :triggers, :name, :string
  end
end
