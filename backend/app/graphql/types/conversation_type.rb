Types::ConversationType = GraphQL::ObjectType.define do
  name "Conversation"

  field :id, !types.ID
  field :messages, types[Types::MessageType] do
    resolve ->(obj, _args, _ctx) {
      obj.messages
    }
  end
end
