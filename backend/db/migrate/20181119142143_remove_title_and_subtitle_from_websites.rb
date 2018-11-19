class RemoveTitleAndSubtitleFromWebsites < ActiveRecord::Migration[5.1]
  def change
    remove_column :websites, :title, :string
    remove_column :websites, :subtitle, :string
  end
end
