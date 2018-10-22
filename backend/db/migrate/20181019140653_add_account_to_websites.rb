class AddAccountToWebsites < ActiveRecord::Migration[5.1]
  def change
    add_reference :websites, :account, foreign_key: true, null: false
  end
end
