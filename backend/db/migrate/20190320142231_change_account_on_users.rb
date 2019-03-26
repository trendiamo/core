class ChangeAccountOnUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_null :users, :account_id, true
  end
end
