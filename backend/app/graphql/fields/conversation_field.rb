Fields::ConversationField = GraphQL::Field.define do
  name "conversation"
  description "Show conversation"
  argument :visitorRef, !types.String
  type Types::ConversationType
  resolve ->(_obj, args, _ctx) {
    Conversation.find_by(visitor_ref: args[:visitorRef])
  }
end
