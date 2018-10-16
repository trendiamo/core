Types::ChatStepType = GraphQL::ObjectType.define do
  name "ChatMessage"

  field :id, !types.ID
  field :status, Types::StatusType
  field :chatMessages, types[Types::ChatMessageType] do
    resolve ->(obj, _args, _ctx) {
      obj.chat_messages
    }
  end
  field :chatOptions, types[Types::ChatOptionType] do
    resolve ->(obj, _args, _ctx) {
      obj.chat_options
    }
  end
  field :referringChatOptions, types[Types::ChatOptionType] do
    resolve ->(obj, _args, _ctx) {
      obj.referring_chat_options
    }
  end
  field :chat, Types::ChatType
end
