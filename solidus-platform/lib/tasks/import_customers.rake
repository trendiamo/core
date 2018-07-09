task import_customers: :environment do
  def extract_customer_information(customer)
    keys = %w[email first_name last_name orders_count state total_spent last_order_id
      note verified_email multipass_identifier tax_exempt phone tags last_order_name addresses orders]

    new_customer_hash = Hash[keys.each_with_object(nil).to_a]
    new_customer_hash["email"] = customer.attributes["email"]
    new_customer_hash["firstname"] = customer.attributes["first_name"]
    new_customer_hash["lastname"] = customer.attributes["last_name"]
    new_customer_hash["address"] = customer.default_address.attributes
    new_customer_hash["phone"] = customer.attributes["phone"]
    new_customer_hash["orders"] = customer.orders.map(&:attributes)
    new_customer_hash
  end

  def import_address(customer_hash)
    spree_customer_address = Spree::Address.create!(firstname: customer_hash["firstname"], lastname: customer_hash["lastname"], address1: customer_hash["address"]["address1"], address2: customer_hash["address"]["address2"], city: customer_hash["city"], zipcode: customer_hash["zip"], phone: customer_hash["phone"])
  end

  def create_customer(customer_hash)
    spree_customer = Spree::User.create!(email: customer_hash["email"])
    spree_address = import_address(customer_hash)
    byebug
  end

  customers = ShopifyAPI::Customer.all
  new_customers_array = []
  customers.each do |customer|
    new_customers_array << extract_customer_information(customer)
  end
  new_customers_array.each do |customer_hash|
    byebug
    spree_customer = Spree::User.find_by(email: customer_hash["email"])
    if spree_customer
      # update_customer(customer_hash, spree_customer)
    else
      # create_customer(customer_hash)
    end
  end
end
