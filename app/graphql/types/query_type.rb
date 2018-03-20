Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :products, !types[Types::ProductType] do
    description "List products"
    argument :productRefs, !types[types.String]
    resolve ->(_obj, args, _ctx) {
      args[:productRefs].map do |product_ref|
        OpenStruct.new(product_ref: product_ref)
      end
    }
  end

  field :comments, !types[Types::CommentType] do
    description "List comments of a product"
    argument :productRef, !types.String
    resolve ->(_obj, args, _ctx) {
      Comment.where(product_ref: args[:productRef]).order("pinned desc,upvotes_count desc,created_at asc")
    }
  end
end
