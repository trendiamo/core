Types::ExpositionType = GraphQL::ObjectType.define do
  name "Exposition"

  field :id, !types.ID
  # field :domain, types.String
  field :description, types.String
  field :ctaUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.cta_url }
  end
  field :ctaText, types.String do
    resolve ->(obj, _args, _ctx) { obj.cta_text }
  end
end
