class AddNameToTriggers < ActiveRecord::Migration[5.1]
  def change
    add_column :triggers, :name, :string
  end
end
