Fields::ProductsField = GraphQL::Field.define do
  name "products"
  description "List all products"
  type types[Types::ProductType]
  resolve ->(_obj, _args, _ctx) { Spree::Product.all }
end
