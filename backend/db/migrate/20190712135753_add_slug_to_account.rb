class AddSlugToAccount < ActiveRecord::Migration[5.1]
  def change
    add_column :accounts, :slug, :string, null: false, default: ''
  end
end
