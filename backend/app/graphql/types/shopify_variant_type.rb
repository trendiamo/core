Types::ShopifyVariantType = GraphQL::ObjectType.define do
  name "ShopifyVariantType"

  field :id, !types.ID do
    resolve ->(obj, _args, _ctx) { obj["id"] }
  end
  field :title, !types.String do
    resolve ->(obj, _args, _ctx) { obj["title"] }
  end
  field :inventoryQuantity, !types.Int do
    resolve ->(obj, _args, _ctx) { obj["inventory_quantity"] }
  end
end
