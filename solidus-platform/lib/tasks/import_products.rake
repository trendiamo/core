task import_products: :environment do
  ShopifyImport.new.perform
end
