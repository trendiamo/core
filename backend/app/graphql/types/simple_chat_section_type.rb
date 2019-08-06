Types::SimpleChatSectionType = GraphQL::ObjectType.define do
  name "SimpleChatSection"

  field :id, !types.ID
  field :key, !types.String
  field :simpleChatMessages, types[Types::SimpleChatMessageType] do
    resolve ->(obj, _args, _ctx) {
      obj.simple_chat_messages.order(:order)
    }
  end
end
