Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id, !types.ID
  field :user, !Types::UserType
  field :productRef, !types.String do
    resolve ->(obj, _args, _ctx) { obj.product_ref }
  end
  field :likesCount, !types.Int do
    resolve ->(obj, _args, _ctx) { obj.likes_count }
  end
  field :likes, !types[Types::LikeType] do
    argument :currentUser, types.Boolean
    resolve ->(obj, args, ctx) do
      if args[:currentUser]
        obj.likes.where(user: ctx[:current_user])
      else
        obj.likes
      end
    end
  end
end
