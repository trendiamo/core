Types::SpotlightType = GraphQL::ObjectType.define do
  name "Spotlight"

  field :id, !types.ID
  field :order, types.Int
  field :persona, !Types::PersonaType do
    resolve ->(obj, _args, _ctx) {
      obj.persona
    }
  end
  field :productPicks, types[Types::ProductPickType] do
    resolve ->(obj, _args, _ctx) {
      obj.product_picks.order(:order)
    }
  end
end
