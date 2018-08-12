module Shopify
  class CreateCollection
    attr_reader :brand

    def initialize(brand)
      @brand = brand
    end

    def perform
      add_shopify_collection && save_shopify_collection_id
    end

    private

    def add_shopify_collection
      @shopify_collection = ShopifyAPI::SmartCollection.new(shopify_collection_attrs)
      @shopify_collection.save
    end

    def save_shopify_collection_id
      @brand = Brand.find(brand.id)
      @brand.update(shopify_collection_id: @shopify_collection.id)
    end

    def shopify_collection_attrs
      {
        title: brand.name,
        handle: slug,
        template_suffix: "seller",
        sort_order: "best-selling",
        body_html: brand.short_description + "\n\n<p>###</p>\n" + brand.long_description,
        rules: [{ column: "vendor", relation: "equals", condition: slug }],
        published: false,
        image: { src: brand.logo_url },
      }
    end

    def slug
      brand.name.downcase.strip.tr(" ", "-").gsub(/[^\w-]/, "")
    end
  end
end
