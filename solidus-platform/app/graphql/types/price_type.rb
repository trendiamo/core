Types::PriceType = GraphQL::ObjectType.define do
  name "Price"

  field :id, types.ID
  field :amount, types.Float
  field :currency, types.String
end
