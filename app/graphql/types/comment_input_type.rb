Types::CommentInputType = GraphQL::InputObjectType.define do
  name "CommentInputType"

  argument :productRef, !types.String
  argument :content, !types.String
end
