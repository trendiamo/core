class AddInstagramUrlToPersonas < ActiveRecord::Migration[5.1]
  def change
    add_column :personas, :instagram_url, :string, null: true
  end
end
