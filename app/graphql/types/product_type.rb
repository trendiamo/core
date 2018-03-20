Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  # field :id, !types.ID
  field :productRef, !types.String do
    resolve ->(obj, _args, _ctx) { obj.product_ref }
  end
  field :likesCount, !types.Int do
    resolve ->(obj, _args, _ctx) { Like.where(product_ref: obj.product_ref).count }
  end
  field :likes, !types[Types::LikeType] do
    argument :currentUser, types.Boolean
    resolve ->(obj, args, ctx) do
      if args[:currentUser]
        Like.where(product_ref: obj.product_ref, customer_ref: ctx[:current_user]&.customer_ref)
      else
        Like.where(product_ref: obj.product_ref)
      end
    end
  end
end
