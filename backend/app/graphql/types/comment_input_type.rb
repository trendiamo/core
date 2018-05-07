Types::CommentInputType = GraphQL::InputObjectType.define do
  name "CommentInputType"

  argument :productId, !types.ID
  argument :content, !types.String
end
