Types::MessageType = GraphQL::ObjectType.define do
  name "Message"

  field :id, !types.ID
  field :body, types.String
end
