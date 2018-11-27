Types::WebsiteType = GraphQL::ObjectType.define do
  name "Website"

  field :id, !types.ID
  field :name, types.String
end
