Types::FlowType = GraphQL::ObjectType.define do
  name "Flow"

  field :id, !types.ID
  field :chatBubbleText, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.chat_bubble_text
    }
  end
  field :chatBubbleExtraText, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.chat_bubble_extra_text
    }
  end
  field :flowType, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj.class.name.camelize(:lower)
    }
  end
  field :persona, Types::PersonaType do
    resolve ->(obj, _args, _ctx) {
      obj.persona
    }
  end
end
