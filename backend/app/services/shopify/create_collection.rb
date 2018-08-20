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
      shopify_collection_metafields.each do |metafield|
        @shopify_collection.add_metafield(metafield)
      end
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
        published_scope: "global",
        image: { src: brand.logo_url },
      }
    end

    def shopify_collection_metafields
      if brand.header_content_video
        video_url = brand.header_content_video
        video_id = video_url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)[7]
      else
        video_id = nil
      end
      [
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: video_id,
            key: "about_video_url",
            value_type: "string",
          }
        ),
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: brand.header_content_photo,
            key: "about_image_url",
            value_type: "string",
          }
        ),
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: brand.legal_name,
            key: "legal_business_name",
            value_type: "string",
          }
        ),
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: brand.legal_address_city + ", " + brand.legal_address_country,
            key: "business_location",
            value_type: "string",
          }
        ),
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: brand.legal_address_city + ", " + brand.legal_address_country,
            key: "business_location",
            value_type: "string",
          }
        ),
        ShopifyAPI::Metafield.new(
          {
            namespace: "custom_fields",
            value: brand.eu_shipping_time,
            key: "shipping_timeframe",
            value_type: "string",
          }
        ),
      ]
    end

    def slug
      brand.name.downcase.strip.tr(" ", "-").gsub(/[^\w-]/, "")
    end
  end
end
