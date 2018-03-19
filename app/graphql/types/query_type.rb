Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :comments, !types[Types::CommentType] do
    description "List comments of a product"
    argument :productRef, !types.String
    resolve ->(_obj, args, _ctx) {
      Comment.where(product_ref: args[:productRef]).order("pinned desc,upvotes_count desc,created_at asc")
    }
  end
end
