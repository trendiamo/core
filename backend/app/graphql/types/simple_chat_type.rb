Types::SimpleChatType = GraphQL::ObjectType.define do
  name "SimpleChat"

  field :id, !types.ID
  field :heading, types.String
  field :name, types.String
  field :teaserMessage, types.String do
    resolve ->(obj, _args, _ctx) { obj.teaser_message }
  end
  field :extraTeaserMessage, types.String do
    resolve ->(obj, _args, _ctx) { obj.extra_teaser_message }
  end
  field :useSellerAnimation, !types.Boolean do
    resolve ->(obj, _args, _ctx) { obj.use_seller_animation }
  end
  field :simpleChatSections, types[Types::SimpleChatSectionType] do
    resolve ->(obj, _args, _ctx) {
      obj.simple_chat_sections.order(:order)
    }
  end
end
