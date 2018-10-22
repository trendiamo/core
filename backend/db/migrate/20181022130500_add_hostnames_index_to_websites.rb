class AddHostnamesIndexToWebsites < ActiveRecord::Migration[5.1]
  def change
    add_index :websites, :hostnames, using: "gin"
  end
end
