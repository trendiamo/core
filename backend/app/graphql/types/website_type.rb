Types::WebsiteType = GraphQL::ObjectType.define do
  name "Website"

  field :id, !types.ID
  # field :status, Types::StatusType
  field :name, types.String
end
