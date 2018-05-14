Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id, !types.ID
  field :user, Types::UserType
  field :productRef, !types.String do
    resolve ->(obj, _args, _ctx) { obj.product_ref }
  end
  field :mediaItems, types[types.String] do
    resolve ->(obj, _args, _ctx) { obj.media_items }
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
  field :shopifyProduct, Types::ShopifyProductType do
    resolve ->(obj, _args, ctx) do
      ctx[:shopify_products].select { |s| s.id.to_s == obj.product_ref }[0] unless ctx[:headers]["INCLUDE-SHOPIFY"].nil?
    end
  end
end
