class CreateShopifyCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :shopify_customers do |t|
      t.string :email, null: false, index: {unique: true}
      t.string :password, null: false
      t.string :oauth_provider
      t.json :answers

      t.timestamps
    end
  end
end
