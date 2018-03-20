Types::FlagType = GraphQL::ObjectType.define do
  name "InappropriateFlag"

  field :id, !types.ID
  field :user, Types::UserType do
    resolve ->(obj, _args, _ctx) { obj.user }
  end
  field :comment, Types::CommentType do
    resolve ->(obj, _args, _ctx) { obj.comment }
  end
end
