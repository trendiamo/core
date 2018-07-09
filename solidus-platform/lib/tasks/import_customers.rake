task import_customers: :environment do
  ShopifyImportCustomers.new.perform
end
