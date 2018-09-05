Fields::ShopifyCollectionField = GraphQL::Field.define do
  name "shopifyCollection"
  description "Show collection"
  type Types::ShopifyCollectionType
  argument :shopifyId, !types.String
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    ShopifyAPI::SmartCollection.find(args[:shopifyId])
  }
end
