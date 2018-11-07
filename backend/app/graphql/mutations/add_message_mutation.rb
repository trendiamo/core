Mutations::AddMessageMutation = GraphQL::Field.define do
  name "Add message"
  description "Add message"
  argument :body, !types.String
  argument :visitorRef, !types.String
  type !Types::MessageType
  resolve ->(_obj, args, _ctx) {
    conversation_params = {
      account_id: ActsAsTenant.default_tenant.id,
      visitor_ref: args[:visitorRef],
      user: User.first,
    }
    conversation = Conversation.find_or_create_by!(conversation_params)
    message_params = {
      account_id: ActsAsTenant.default_tenant.id,
      conversation: conversation,
      visitor_ref: args[:visitorRef],
      body: args[:body],
    }
    Message.create!(message_params)
  }
end
