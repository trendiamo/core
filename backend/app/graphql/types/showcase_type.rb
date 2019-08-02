Types::ShowcaseType = GraphQL::ObjectType.define do
  name "Showcase"

  field :id, !types.ID
  field :title, !types.String
  field :subtitle, !types.String
  field :useSellerAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :usePersonaAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :spotlights, types[Types::SpotlightType] do
    resolve ->(obj, _args, _ctx) {
      obj.spotlights.order(:order)
    }
  end
end
