Types::ShowcaseType = GraphQL::ObjectType.define do
  name "Showcase"

  field :id, !types.ID
  field :title, !types.String
  field :subtitle, !types.String
  field :spotlights, types[Types::SpotlightType] do
    resolve ->(obj, _args, _ctx) {
      obj.spotlights.order(:order)
    }
  end
end
