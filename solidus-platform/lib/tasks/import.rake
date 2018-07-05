task import: :environment do
  def extract_product_information(product)
    keys = ["name", "sku", "description", "slug", "variants", "meta_description", "meta_keywords", "meta_title", "price", "option_types", "taxons", "stock", "height", "width", "depth", "images"]
    new_product_hash = Hash[keys.each_with_object(nil).to_a]
    new_product_hash["name"] = product.attributes["title"]
    new_product_hash["description"] = product.attributes["body_html"]
    new_product_hash["slug"] = product.attributes["handle"].to_s
    new_product_hash["variants"] = product.attributes["variants"].map(&:attributes)
    new_product_hash["price"] = product.attributes["variants"].first.attributes["price"]
    new_product_hash["option_types"] = product.attributes["options"].map(&:attributes)
    new_product_hash["taxons"] = product.attributes["vendor"]
    new_product_hash["images"] = product.images.map(&:attributes)
    new_product_hash
  end

  def create_product(product_hash)
      spree_product = Spree::Product.create!(name: product_hash["name"], description: product_hash["description"], shipping_category_id: 1, tax_category_id: 1, price: product_hash["price"])
      spree_product.update!(slug: product_hash["slug"])
      spree_taxonomy = Spree::Taxonomy.find_by(name: "Collection")
      unless spree_taxonomy
        spree_taxonomy = Spree::Taxonomy.create!(name: "Collection")
      end
      spree_taxon = Spree::Taxon.find_by(name: product_hash["taxons"])
      parent_taxon =  Spree::Taxon.find_by(name: "Collection")
      unless spree_taxon
        spree_taxon = Spree::Taxon.create!(name: product_hash["taxons"], taxonomy: spree_taxonomy, parent: parent_taxon)
      end
      spree_product.taxons << spree_taxon
      product_hash["option_types"].each do |option_type_hash|
        if option_type_hash["name"] != "Title"
          spree_product_option_type = Spree::OptionType.find_by(name: option_type_hash["name"].capitalize)
          unless spree_product_option_type
            spree_product_option_type = Spree::OptionType.create!(name: option_type_hash["name"].capitalize, presentation: option_type_hash["name"].capitalize)
          end
          option_type_hash["values"].each do |option_value|
            spree_option_value = Spree::OptionValue.find_by(name: option_value)
            unless spree_option_value
              spree_option_value = Spree::OptionValue.create!(name: option_value, presentation: option_value, option_type: spree_product_option_type)
            end
            spree_product_option_type.option_values << spree_option_value
          end
          spree_product.option_types << spree_product_option_type
        end
      end
      product_hash["variants"].each do |product_hash_variant|
        spree_product_variant = Spree::Variant.create!(product: spree_product, sku: product_hash_variant["sku"], weight: product_hash_variant["weight"], position: product_hash_variant["position"], cost_currency: "EUR")
        spree_product_variant_price = Spree::Price.create!(variant: spree_product_variant, amount: product_hash_variant["price"], currency: "EUR")
        spree_product_variant.stock_items.first.update_column(:count_on_hand, product_hash_variant["inventory_quantity"])
        spree_option_value = Spree::OptionValue.find_by(name: product_hash_variant['title'])
        Spree::OptionValuesVariant.create!(variant: spree_product_variant, option_value: spree_option_value)
      end
  end

  Spree::Product.destroy_all
  Spree::Taxonomy.destroy_all
  Spree::Taxon.destroy_all
  Spree::OptionType.destroy_all
  Spree::OptionValue.destroy_all
  Spree::Variant.destroy_all
  Spree::OptionValuesVariant.destroy_all
  Spree::Price.destroy_all

  products = ShopifyAPI::Product.all
  new_products_array = []
  products.each do |product|
    new_products_array << extract_product_information(product)
  end
  new_products_array.each do |product_hash|
    spree_product = Spree::Product.find_by(slug: product_hash["slug"])
    unless spree_product
      spree_product = create_product(product_hash)
    end
  end
end
