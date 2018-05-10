Types::ShopifyProductType = GraphQL::ObjectType.define do
  name "ShopifyProductType"

  field :id, !types.ID
  field :title, !types.String
  field :vendor, types.String
end
