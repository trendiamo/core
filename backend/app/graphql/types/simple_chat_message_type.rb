Types::SimpleChatMessageType = GraphQL::ObjectType.define do
  name "SimpleChatMessage"

  field :id, !types.ID
  field :text, types.String
end
