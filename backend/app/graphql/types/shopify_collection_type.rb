Types::ShopifyCollectionType = GraphQL::ObjectType.define do
  name "ShopifyCollectionType"

  field :id, !types.ID
  field :handle, types.String
  field :productsCount, types.Int do
    resolve ->(obj, _args, _ctx) { obj.products.count }
  end
  connection :products, Types::ShopifyProductType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.products.map(&:attributes)
    }
  end
end
