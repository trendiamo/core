class ChangeComments < ActiveRecord::Migration[5.1]
  def change
    remove_column :comments, :product_ref, :string
    add_reference :comments, :product, index: true, null: false
  end
end
