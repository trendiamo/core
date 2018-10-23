Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :me, Fields::MeField
  field :website, Fields::WebsiteField
end
