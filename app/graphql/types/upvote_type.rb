Types::UpvoteType = GraphQL::ObjectType.define do
  name "Upvote"

  field :id, !types.ID
  field :user, Types::UserType do
    resolve ->(obj, _args, _ctx) { obj.user }
  end
  field :comment, Types::CommentType do
    resolve ->(obj, _args, _ctx) { obj.comment }
  end
end
