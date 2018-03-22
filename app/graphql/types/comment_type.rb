Types::CommentType = GraphQL::ObjectType.define do
  name "Comment"

  field :id, !types.ID
  field :user, !Types::UserType
  field :product, !Types::ProductType
  field :content, !types.String
  field :pinned, !types.Boolean
  field :isFromProductOwner, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.user_id == obj.product.user_id }
  end
  field :createdAt, !types.String do
    resolve ->(obj, _args, _ctx) { obj.created_at.iso8601 }
  end
  field :upvotesCount, !types.Int do
    resolve ->(obj, _args, _ctx) { obj.upvotes_count }
  end
  field :upvotes, !types[Types::UpvoteType] do
    argument :currentUser, types.Boolean
    resolve ->(obj, args, ctx) do
      if args[:currentUser]
        obj.upvotes.where(user: ctx[:current_user])
      else
        obj.upvotes
      end
    end
  end
  field :flags, !types[Types::FlagType] do
    argument :currentUser, types.Boolean
    resolve ->(obj, args, ctx) do
      if args[:currentUser]
        obj.inappropriate_flags.where(user: ctx[:current_user])
      else
        obj.inappropriate_flags
      end
    end
  end
end
