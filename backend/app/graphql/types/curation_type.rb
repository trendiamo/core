Types::CurationType = GraphQL::ObjectType.define do
  name "Curation"

  field :id, !types.ID
  field :title, !types.String
  field :subtitle, !types.String
  field :spotlights, types[Types::SpotlightType] do
    resolve ->(obj, _args, _ctx) {
      obj.spotlights
    }
  end
end
