CommentInputType = GraphQL::InputObjectType.define do
  name "CommentInputType"

  argument :productRef, !types.String
  argument :content, !types.String
end

Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :addComment, Types::CommentType do
    argument :comment, !CommentInputType

    resolve ->(_obj, args, ctx) {
      Comment.create!(args[:comment].to_h.transform_keys { |key| key.to_s.underscore }.merge(user: ctx[:current_user]))
    }
  end
end
