Types::HostnameInputType = GraphQL::InputObjectType.define do
  name "HostnameInput"
  argument :id, types.ID
  argument :status, Types::StatusType
  argument :hostname, types.String
end
