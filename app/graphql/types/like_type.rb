Types::LikeType = GraphQL::ObjectType.define do
  name "Like"

  field :id, !types.ID
  field :user, Types::UserType do
    resolve ->(obj, _args, _ctx) { obj.user }
  end
  field :product, Types::ProductType do
    resolve ->(obj, _args, _ctx) { OpenStruct.new(product_ref: obj.product_ref) }
  end
end
