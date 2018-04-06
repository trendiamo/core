module Bubble
  class AddInfluencer
    attr_reader :influencer

    def initialize(influencer)
      @influencer = influencer
    end

    def perform
      add_shopify_collection
    end

    private

    def add_shopify_collection
      smart_collection_attrs = {
        handle: influencer.handle,
        title: influencer.handle,
        rules: [
          { column: "tag", relation: "equals", condition: "influencer: #{influencer.handle}" },
        ],
      }
      smart_collection = ShopifyAPI::SmartCollection.new(smart_collection_attrs)
      smart_collection.save
    end
  end
end
