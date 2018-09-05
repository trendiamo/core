Types::ShopifyImageType = GraphQL::ObjectType.define do
  name "ShopifyImageType"

  field :id, !types.ID do
    resolve ->(obj, _args, _ctx) { obj["id"] }
  end
  field :originalSrc, !types.String do
    resolve ->(obj, _args, _ctx) { obj["src"] }
  end
end
