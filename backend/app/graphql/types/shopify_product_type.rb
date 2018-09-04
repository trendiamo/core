Types::ShopifyProductType = GraphQL::ObjectType.define do
  name "ShopifyProductType"

  field :id, !types.ID do
    resolve ->(obj, _args, _ctx) { obj["id"] }
  end
  field :handle, !types.String do
    resolve ->(obj, _args, _ctx) { obj["handle"] }
  end
  field :title, !types.String do
    resolve ->(obj, _args, _ctx) { obj["title"] }
  end
  connection :variants, Types::ShopifyVariantType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj["variants"].map(&:attributes)
    }
  end
  connection :images, Types::ShopifyImageType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj["images"].map(&:attributes)
    }
  end
end
