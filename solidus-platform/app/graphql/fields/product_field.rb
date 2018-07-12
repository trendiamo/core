Fields::ProductField = GraphQL::Field.define do
  name "product"
  description "Get product by slug"
  argument :slug, !types.String
  type Types::ProductType
  resolve ->(_obj, args, _ctx) do
    Spree::Product.find_by(slug: args[:slug])
  end
end
