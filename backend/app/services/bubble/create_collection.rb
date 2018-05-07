module Bubble
  class CreateCollection
    attr_reader :collection_params

    def initialize(collection_params)
      @collection_params = collection_params
    end

    def perform
      create_collection && add_shopify_collection
    end

    def as_json(_arg)
      {
        backend_collection: @backend_collection&.as_json,
        shopify_collection: @shopify_collection&.as_json,
      }
    end

    def errors
      {
        backend_collection: @backend_collection&.errors,
        shopify_collection: @shopify_collection&.errors,
      }
    end

    private

    def create_collection
      @backend_collection = Collection.new(backend_collection_attrs)
      @backend_collection.save
    end

    def add_shopify_collection
      @shopify_collection = ShopifyAPI::SmartCollection.new(shopify_collection_attrs)
      @shopify_collection.save
    end

    def for_brand?
      collection_params[:type] == "brand"
    end

    def backend_collection_attrs
      collection_params.reverse_merge(type: "influencer")
    end

    def shopify_collection_attrs
      {
        handle: collection_params[:handle],
        title: collection_params[:title],
        rules: [rule],
      }
    end

    def rule
      if for_brand?
        { column: "vendor", relation: "equals", condition: collection_params[:handle] }
      else
        { column: "tag", relation: "equals", condition: "influencer: #{collection_params[:handle]}" }
      end
    end
  end
end
