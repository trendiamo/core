class AddExpositionHostnameToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :exposition_hostname, :string
  end
end
