Types::ShowcaseType = GraphQL::ObjectType.define do
  name "Showcase"

  field :id, !types.ID
  field :title, !types.String do
    resolve ->(obj, _args, _ctx) { obj.heading }
  end
  field :heading, !types.String
  field :subtitle, !types.String do
    resolve ->(obj, _args, _ctx) { obj.subheading }
  end
  field :subheading, !types.String
  field :useSellerAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :spotlights, types[Types::SpotlightType] do
    resolve ->(obj, _args, _ctx) {
      obj.spotlights.order(:order)
    }
  end
end
