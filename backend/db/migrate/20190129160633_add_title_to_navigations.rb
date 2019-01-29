class AddTitleToNavigations < ActiveRecord::Migration[5.1]
  def change
    add_column :navigations, :title, :string, default: "", null: false
  end
end
