class AddIsECommerceToWebsite < ActiveRecord::Migration[5.1]
  def change
    add_column :websites, :is_e_commerce, :boolean, null: false, default: true
  end
end
