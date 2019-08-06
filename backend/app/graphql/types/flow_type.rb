Types::FlowType = GraphQL::ObjectType.define do
  name "Flow"

  field :id, !types.ID
  field :teaserMessage, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.teaser_message
    }
  end
  field :extraTeaserMessage, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.extra_teaser_message if obj.class.name.camelize(:lower) != "outro"
    }
  end
  field :chatBubbleButtonYes, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.chat_bubble_button_yes if obj.class.name.camelize(:lower) == "outro"
    }
  end
  field :chatBubbleButtonNo, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.chat_bubble_button_no if obj.class.name.camelize(:lower) == "outro"
    }
  end
  field :flowType, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj.class.name.camelize(:lower)
    }
  end
  field :seller, Types::SellerType do
    resolve ->(obj, _args, _ctx) {
      obj.seller
    }
  end
  field :useSellerAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) {
      obj.use_seller_animation
    }
  end
end
