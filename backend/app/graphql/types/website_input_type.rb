Types::WebsiteInputType = GraphQL::InputObjectType.define do
  name "WebsiteInput"
  argument :id, types.ID
  argument :status, Types::StatusType
  argument :name, types.String
  argument :title, types.String
  argument :subtitle, types.String
end
