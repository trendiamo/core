Types::ChatStepType = GraphQL::ObjectType.define do
  name "ChatStep"

  field :id, !types.ID
  field :status, Types::StatusType
  field :chatMessages, types[Types::ChatMessageType] do
    resolve ->(obj, _args, _ctx) {
      obj.chat_messages.order(:order)
    }
  end
  field :chatOptions, types[Types::ChatOptionType] do
    resolve ->(obj, _args, _ctx) {
      obj.chat_options.order(:order)
    }
  end
  field :referringChatOptions, types[Types::ChatOptionType] do
    resolve ->(obj, _args, _ctx) {
      obj.referring_chat_options
    }
  end
  field :scriptedChat, Types::ScriptedChatType
end
