Types::ProductsDeletePayloadType = GraphQL::ObjectType.define do
  name "ProductsDeletePayload"

  field :deletedProductsIds, !types[types.ID] do
    resolve ->(obj, _args, _ctx) { obj }
  end
end
