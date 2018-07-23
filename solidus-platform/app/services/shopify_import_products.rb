require "open-uri"
OpenURI::Buffer.send :remove_const, "StringMax"
OpenURI::Buffer.const_set "StringMax", 0

class ShopifyImportProducts
  def initialize; end

  def perform
    products = ShopifyAPI::Product.all
    new_products_array = []
    products.each do |product|
      new_products_array << extract_product_information(product)
    end
    new_products_array.each do |product_hash|
      spree_product = Spree::Product.find_by(slug: product_hash["slug"])
      if product_hash["taxons"] != "Trendiamo"
        spree_product ? update_product(product_hash, spree_product) : create_product(product_hash)
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
    new_product_hash = {}
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
    return spree_taxonomy unless spree_taxonomy.nil?
    spree_taxonomy = Spree::Taxonomy.create!(name: "Collection")
    spree_taxonomy
  end

  def import_taxon(product_hash, spree_taxonomy)
    parent_taxon = Spree::Taxon.find_by(name: "Collection")
    spree_taxon = Spree::Taxon.find_by(name: product_hash["taxons"])
    return spree_taxon unless spree_taxon.nil?
    spree_taxon = Spree::Taxon.create!(name: product_hash["taxons"], taxonomy: spree_taxonomy)
    spree_taxon.parent = parent_taxon
    spree_taxon
  end

  def import_option_type(option_type_hash)
    spree_product_option_type = Spree::OptionType.find_by(name: option_type_hash["name"].capitalize)
    params = { option_type: {
      name: option_type_hash["name"].capitalize,
      presentation: option_type_hash["name"].capitalize,
    }, }
    spree_product_option_type ||= Spree::OptionType.create!(params[:option_type])
    option_type_hash["values"].each do |option_value|
      spree_option_value = Spree::OptionValue.find_by(name: option_value)
      params = { option_value: {
        name: option_value,
        presentation: option_value,
        option_type: spree_product_option_type,
      }, }
      spree_option_value ||= Spree::OptionValue.create!(params[:option_value])
      spree_product_option_type.option_values << spree_option_value
    end
    spree_product_option_type
  end

  def import_variant(product_hash_variant, spree_product)
    params = { variant: {
      product: spree_product,
      sku: product_hash_variant["sku"],
      weight: product_hash_variant["weight"],
      position: product_hash_variant["position"],
      cost_currency: "EUR",
    }, }
    spree_product_variant = Spree::Variant.create!(params[:variant])
    params = { price: {
      variant: spree_product_variant,
      amount: product_hash_variant["price"],
      currency: "EUR",
    }, }
    Spree::Price.create!(params[:price])
    spree_product_variant.stock_items.first.update_column(:count_on_hand, product_hash_variant["inventory_quantity"])
    spree_option_value = Spree::OptionValue.find_by(name: product_hash_variant["title"])
    params = { option_value_variant: {
      variant: spree_product_variant,
      option_value: spree_option_value,
    }, }
    Spree::OptionValuesVariant.create!(params[:option_value_variant])
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
    return unless product.images.where(attachment_file_name: file_name(name, type)).none?
    new_image = File.open(image(image_hash["src"], type))
    params = { image: {
      attachment: new_image,
      attachment_file_name: file_name(name, type),
      position: image_hash["position"],
    }, }
    product.images << Spree::Image.create!(params[:image])
    File.delete(new_image)
  end

  def update_variant(product_hash_variant, spree_variant)
    params = { variant: {
      weight: product_hash_variant["weight"],
      position: product_hash_variant["position"],
      cost_currency: "EUR",
    }, }
    spree_variant.update(params[:variant])
    spree_variant.price = product_hash_variant["price"]
    spree_variant.stock_items.first.update_column(:count_on_hand, product_hash_variant["inventory_quantity"])
    spree_option_value = Spree::OptionValue.find_by(name: product_hash_variant["title"])
    return unless spree_option_value.nil?
    Spree::OptionValuesVariant.create!(variant: spree_variant, option_value: spree_option_value)
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
