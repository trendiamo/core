class AddAccountToTriggers < ActiveRecord::Migration[5.1]
  def change
    add_reference :triggers, :account, foreign_key: true
  end
end
