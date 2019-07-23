Types::SimpleChatType = GraphQL::ObjectType.define do
  name "SimpleChat"

  field :id, !types.ID
  field :title, types.String
  field :name, types.String
  field :chatBubbleText, types.String do
    resolve ->(obj, _args, _ctx) { obj.chat_bubble_text }
  end
  field :chatBubbleExtraText, types.String do
    resolve ->(obj, _args, _ctx) { obj.chat_bubble_extra_text }
  end
  field :usePersonaAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_persona_animation }
  end
  field :simpleChatSteps, types[Types::SimpleChatStepType] do
    resolve ->(obj, _args, _ctx) {
      obj.simple_chat_steps.order(:order)
    }
  end
end
