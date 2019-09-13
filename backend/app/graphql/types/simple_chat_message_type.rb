Types::SimpleChatMessageType = GraphQL::ObjectType.define do
  name "SimpleChatMessage"

  field :id, !types.ID
  field :type, types.String
  field :html, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.html if obj.class.name == "SimpleChatTextMessage"
    }
  end
  field :title, types.String
  field :imgRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
  field :img, Types::ImgType do
    resolve ->(obj, _args, _ctx) {
      ActsAsTenant.without_tenant do
        { url: obj.img.url } if %w[SimpleChatImageMessage SimpleChatProductMessage].include?(obj.class.name)
      end
    }
  end
  field :url, types.String
  field :displayPrice, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.display_price if obj.class.name == "SimpleChatProductMessage"
    }
  end
  field :videoUrl, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.video_url if obj.class.name == "SimpleChatVideoMessage"
    }
  end
  field :groupWithAdjacent, types.Boolean do
    resolve ->(obj, _args, _ctx) {
      obj.group_with_adjacent if %w[SimpleChatImageMessage SimpleChatProductMessage].include?(obj.class.name)
    }
  end
end
