class AddShippingAndBankDetailsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :date_of_birth, :datetime
    add_column :users, :shipping_first_name, :string
    add_column :users, :shipping_last_name, :string
    add_column :users, :address_line1, :string
    add_column :users, :address_line2, :string
    add_column :users, :zip_code, :string
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :payment_first_name, :string
    add_column :users, :payment_last_name, :string
    add_column :users, :payment_address, :string
    add_column :users, :phone_number, :string
    add_column :users, :iban, :string
    add_column :users, :photo_id_front_url, :string
    add_column :users, :photo_id_back_url, :string
  end
end
