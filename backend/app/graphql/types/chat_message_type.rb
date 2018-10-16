Types::ChatMessageType = GraphQL::ObjectType.define do
  name "ChatMessage"

  field :id, !types.ID
  field :status, Types::StatusType
  field :delay, types.Int
  field :text, types.String
  field :chatStep, Types::ChatStepType do
    resolve ->(obj, _args, _ctx) {
      obj.chat_step
    }
  end
end
