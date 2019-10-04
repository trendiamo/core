class RemovePaymentFieldsFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :payment_first_name
    remove_column :users, :payment_last_name
    remove_column :users, :date_of_birth
    remove_column :users, :phone_number
    remove_column :users, :payment_address
    remove_column :users, :iban
    remove_column :users, :photo_id_front_url
    remove_column :users, :photo_id_back_url
  end
end
