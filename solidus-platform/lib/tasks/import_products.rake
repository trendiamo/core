task import_products: :environment do
  ShopifyImportProducts.new.perform
end
