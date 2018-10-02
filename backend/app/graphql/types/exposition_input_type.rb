Types::ExpositionInputType = GraphQL::InputObjectType.define do
  name "ExpositionInput"
  argument :description, types.String
  argument :ctaUrl, !types.String
  argument :domain, !types.String
  argument :ctaText, !types.String
end
