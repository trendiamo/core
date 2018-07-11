require 'open-uri'
OpenURI::Buffer.send :remove_const, 'StringMax'
OpenURI::Buffer.const_set 'StringMax', 0

class ShopifyImportProducts
  def initialize
  end

  def perform
    products = ShopifyAPI::Product.all
    new_products_array = []
    products.each do |product|
      new_products_array << extract_product_information(product)
    end
    new_products_array.each do |product_hash|
      if product_hash["taxons"] == "Trendiamo"
        byebug
      end
      spree_product = Spree::Product.find_by(slug: product_hash["slug"])
      if product_hash["taxons"] != "Trendiamo"
        if spree_product
          update_product(product_hash, spree_product)
        else
          create_product(product_hash)
        end
      end
    end
  end

  def destroy
    Spree::Product.destroy_all
    Spree::Taxonomy.destroy_all
    Spree::Taxon.destroy_all
    Spree::OptionType.destroy_all
    Spree::OptionValue.destroy_all
    Spree::Variant.destroy_all
    Spree::OptionValuesVariant.destroy_all
    Spree::Price.destroy_all
    Spree::Image.destroy_all
  end
  
  private

  def extract_product_information(product)
    keys = %w[name sku description slug variants meta_description meta_keywords meta_title price
              option_types taxons stock height width depth images]
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

  def import_taxonomy
    spree_taxonomy = Spree::Taxonomy.find_by(name: "Collection")
    unless spree_taxonomy
      spree_taxonomy = Spree::Taxonomy.create!(name: "Collection")
    end
    spree_taxonomy
  end

  def import_taxon(product_hash, spree_taxonomy)
    spree_taxon = Spree::Taxon.find_by(name: product_hash["taxons"])
    parent_taxon = Spree::Taxon.find_by(name: "Collection")
    unless spree_taxon
      spree_taxon = Spree::Taxon.create!(name: product_hash["taxons"], taxonomy: spree_taxonomy, parent: parent_taxon)
    end
    spree_taxon
  end

  def import_option_type(option_type_hash)
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
    spree_product_option_type
  end

  def import_variant(product_hash_variant, spree_product)
    spree_product_variant = Spree::Variant.create!(product: spree_product, sku: product_hash_variant["sku"], weight: product_hash_variant["weight"], position: product_hash_variant["position"], cost_currency: "EUR")
    Spree::Price.create!(variant: spree_product_variant, amount: product_hash_variant["price"], currency: "EUR")
    spree_product_variant.stock_items.first.update_column(:count_on_hand, product_hash_variant["inventory_quantity"])
    spree_option_value = Spree::OptionValue.find_by(name: product_hash_variant['title'])
    Spree::OptionValuesVariant.create!(variant: spree_product_variant, option_value: spree_option_value)
  end

  def picture_from_url(url)
    URI.parse(url).open
  end

  def image(url, type = "jpeg")
    file = File.open(picture_from_url(url))
    old_name = [File.dirname(file.path), File.basename(file.path)].join("/")
    new_name = old_name + "." + type
    File.rename(old_name, new_name)
    file.close
    new_name
  end

  def file_name(name, type = "jpeg")
    "#{name}.#{type}"
  end

  def attach_paperclip_image(product, name, type, image_hash)
    if product.images.where(attachment_file_name: file_name(name, type)).none?
      new_image = File.open(image(image_hash["src"], type))
      product.images << Spree::Image.create!(attachment: new_image, attachment_file_name: file_name(name, type), position: image_hash['position'])
      File.delete(new_image)
    end
  end

  def update_variant(product_hash_variant, spree_variant)
    spree_variant.update(weight: product_hash_variant["weight"], position: product_hash_variant["position"], cost_currency: "EUR")
    spree_variant.price = product_hash_variant["price"]
    spree_variant.stock_items.first.update_column(:count_on_hand, product_hash_variant["inventory_quantity"])
    spree_option_value = Spree::OptionValue.find_by(name: product_hash_variant["title"])
    Spree::OptionValuesVariant.create!(variant: spree_variant, option_value: spree_option_value) unless spree_option_value
  end

  def create_product(product_hash)
    spree_taxonomy = import_taxonomy
    spree_taxon = import_taxon(product_hash, spree_taxonomy)
    params = { product: {
      name: product_hash["name"],
      description: product_hash["description"],
      price: product_hash["price"],
      shipping_category_id: 1,
      tax_category_id: 1,
    }, }
    spree_product = Spree::Product.create!(params[:product])
    spree_product.update!(slug: product_hash["slug"])
    spree_product.taxons << spree_taxon

    product_hash["option_types"].each do |option_type_hash|
      spree_product.option_types << import_option_type(option_type_hash) if option_type_hash["name"] != "Title"
    end
    product_hash["variants"].each do |product_hash_variant|
      import_variant(product_hash_variant, spree_product)
    end
    product_hash["images"].each_with_index do |image_hash, index|
      attach_paperclip_image(spree_product, spree_product.slug + "-#{index}", "jpeg", image_hash)
    end
  end

  def update_product(product_hash, spree_product)
    spree_taxonomy = import_taxonomy
    spree_taxon = import_taxon(product_hash, spree_taxonomy)
    params = { product: {
      name: product_hash["name"],
      description: product_hash["description"],
      price: product_hash["price"],
      shipping_category_id: 1,
      tax_category_id: 1,
      slug: product_hash["slug"],
    }, }
    spree_product.update(params[:product])

    spree_product.taxons << spree_taxon unless spree_product.taxons.find_by(name: product_hash["taxons"])

    product_hash["option_types"].each do |option_type_hash|
      if option_type_hash["name"] != "Title" && spree_product.option_types.find_by(name: option_type_hash["name"].capitalize).nil?
        spree_product.option_types << import_option_type(option_type_hash)
      end
    end
    product_hash["variants"].each do |product_hash_variant|
      spree_variant = spree_product.variants.find_by(sku: product_hash_variant["sku"])
      if spree_variant
        update_variant(product_hash_variant, spree_variant)
      else
        import_variant(product_hash_variant, spree_product)
      end
    end
    product_hash["images"].each_with_index do |image_hash, index|
      attach_paperclip_image(spree_product, spree_product.slug + "-#{index}", "jpeg", image_hash)
    end
  end
end
