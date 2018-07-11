class ShopifyImportCustomers
  def initialize
  end

  def perform
    customers = ShopifyAPI::Customer.all
    new_customers_array = []
    customers.each do |customer|
      new_customers_array << extract_customer_information(customer)
    end
    new_customers_array.each do |customer_hash|
      spree_customer = Spree::User.find_by(email: customer_hash["email"])
      spree_customer ? update_customer(customer_hash, spree_customer) : create_customer(customer_hash)
    end
  end

  private

  def extract_customer_information(customer)
    keys = %w[email addresses phone]

    new_customer_hash = Hash[keys.each_with_object(nil).to_a]
    new_customer_hash["email"] = customer.attributes["email"]
    new_customer_hash["addresses"] = customer.addresses.map(&:attributes)
    new_customer_hash["phone"] = customer.attributes["phone"]
    new_customer_hash
  end

  def import_address(address_hash, phone)
    spree_customer_country = Spree::Country.find_by(name: address_hash["country"].capitalize)
    spree_customer_state = Spree::State.where("name like ?", "%#{address_hash["province"]}%").first
    address_hash["phone"] = phone if address_hash["phone"].nil?
    Spree::Address.create!(firstname: address_hash["first_name"], lastname: address_hash["last_name"], address1: address_hash["address1"], address2: address_hash["address2"], city: address_hash["city"], state: spree_customer_state, state_name: address_hash["province"], country: spree_customer_country, zipcode: address_hash["zip"], phone: address_hash["phone"], company: address_hash["company"])
  end

  def create_customer(customer_hash)
    spree_customer = Spree::User.create!(email: customer_hash["email"], password: 'dz3Pw.VAMaWn*5>x^6*QF8#`C36x$NF#')
    customer_hash["addresses"].each do |address_hash|
      spree_addresses = spree_customer.addresses.find_all do |l|
        (l.address1 == address_hash["address1"]) && (l.address2 == address_hash["address2"])
      end
      if spree_addresses.empty?
        Spree::UserAddress.create!(user: spree_customer, address: import_address(address_hash, customer_hash["phone"]))
      end
    end
  end

  def update_customer(customer_hash, spree_customer)
    customer_hash["addresses"].each do |address_hash|
      spree_addresses = spree_customer.addresses.find_all{ |l| (l.address1 == address_hash["address1"]) && (l.address2 == address_hash["address2"])}
      if spree_addresses.empty?
        Spree::UserAddress.create!(user: spree_customer, address: import_address(address_hash, customer_hash["phone"]))
      else
        spree_addresses.each do |address|
          spree_customer_country = Spree::Country.find_by(name: address_hash["country"].capitalize)
          spree_customer_state = Spree::State.find_by(name: address_hash["province"])
          spree_customer.addresses.find(address.id).update(firstname: address_hash["first_name"], lastname: address_hash["last_name"], address1: address_hash["address1"], address2: address_hash["address2"], city: address_hash["city"], state: spree_customer_state, state_name: address_hash["province"], country: spree_customer_country, zipcode: address_hash["zip"], phone: address_hash["phone"], company: address_hash["company"])
        end
      end
    end
  end
end
