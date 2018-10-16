Types::ChatOptionType = GraphQL::ObjectType.define do
  name "ChatOption"

  field :id, !types.ID
  field :status, Types::StatusType
  field :text, types.String
  field :chatStep, Types::ChatStepType do
    resolve ->(obj, _args, _ctx) {
      obj.chat_step
    }
  end
  field :destinationChatStep, Types::ChatStepType do
    resolve ->(obj, _args, _ctx) {
      obj.destination_chat_step
    }
  end
end
