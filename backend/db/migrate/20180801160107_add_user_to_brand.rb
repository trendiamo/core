class AddUserToBrand < ActiveRecord::Migration[5.1]
  def change
    add_reference :brands, :user, foreign_key: true
  end
end
