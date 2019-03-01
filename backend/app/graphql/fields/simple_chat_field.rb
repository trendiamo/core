Fields::SimpleChatField = GraphQL::Field.define do
  name "simple chat"
  description "Show simple chat"
  type Types::SimpleChatType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    SimpleChat.find(args[:id])
  }
end
