class RemoveRevenuesTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :revenues
  end
end
