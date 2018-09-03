Fields::CommentsField = GraphQL::Field.define do
  name "comments"
  description "List comments of a product"
  type !types[Types::CommentType]
  argument :productId, !types.ID
  resolve ->(_obj, args, _ctx) {
    order = "pinned desc,upvotes_count desc,created_at asc"
    Comment.where(product_id: args[:productId], removed_at: nil).order(order)
  }
end
