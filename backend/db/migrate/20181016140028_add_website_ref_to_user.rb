class AddWebsiteRefToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :website_ref, :string
  end
end
