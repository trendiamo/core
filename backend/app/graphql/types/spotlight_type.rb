Types::SpotlightType = GraphQL::ObjectType.define do
  name "Spotlight"

  field :id, !types.ID
  field :order, types.Int
  field :seller, !Types::SellerType do
    resolve ->(obj, _args, _ctx) {
      obj.seller
    }
  end
  field :persona, !Types::SellerType do
    resolve ->(obj, _args, _ctx) {
      obj.seller
    }
  end
  field :useSellerAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :usePersonaAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :productPicks, types[Types::ProductPickType] do
    resolve ->(obj, _args, _ctx) {
      obj.product_picks.order(:order)
    }
  end
end
