Fields::DeleteProductsField = GraphQL::Field.define do
  name "deleteProducts"
  type Types::ProductsDeletePayloadType
  argument :input, !types[types.String]
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    args[:input].each do |e|
      Shopify::DeleteProduct.new(e).perform
    end
  }
end
