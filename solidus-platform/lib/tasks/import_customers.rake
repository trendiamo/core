task import_customers: :environment do
  def extract_customer_information(customer)
    keys = %w[email first_name last_name orders_count state total_spent last_order_id
      note verified_email multipass_identifier tax_exempt phone tags last_order_name addresses]

    new_customer_hash = Hash[keys.each_with_object(nil).to_a]
    new_customer_hash["email"] = customer.attributes["email"]
    new_customer_hash["firstname"] = customer.attributes["first_name"]
    new_customer_hash["lastname"] = customer.attributes["last_name"]
  end

  customers = ShopifyAPI::Customer.all
  new_customers_array = []
  custumers.each do |customer|
    new_customers_array << extract_customer_information(customer)
  end
end
