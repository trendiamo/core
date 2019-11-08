class AddFieldsToBrands < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :email, :string
    add_column :brands, :has_free_sample, :boolean
  end
end
