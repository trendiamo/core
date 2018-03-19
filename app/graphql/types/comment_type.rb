Types::CommentType = GraphQL::ObjectType.define do
  name "Comment"

  field :id, !types.ID
  field :content, !types.String
  field :createdAt, !types.String do
    resolve ->(obj, _args, _ctx) { obj.created_at.iso8601 }
  end
  field :user, Types::UserType do
    resolve ->(obj, _args, _ctx) { obj.user }
  end
end
