class AddTagsToBrands < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :tags, :string
  end
end
