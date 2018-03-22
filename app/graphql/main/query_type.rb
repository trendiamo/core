Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :products, !types[Types::ProductType] do
    description "List products"
    argument :productRefs, !types[types.String]
    resolve ->(_obj, args, _ctx) {
      Product.where(product_ref: args[:productRefs])
    }
  end

  field :comments, !types[Types::CommentType] do
    description "List comments of a product"
    argument :productId, !types.ID
    resolve ->(_obj, args, _ctx) {
      order = "pinned desc,upvotes_count desc,created_at asc"
      Comment.where(product_id: args[:productId], removed_at: nil).order(order)
    }
  end
end
