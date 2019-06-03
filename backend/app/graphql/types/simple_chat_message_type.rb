Types::SimpleChatMessageType = GraphQL::ObjectType.define do
  name "SimpleChatMessage"

  field :id, !types.ID
  field :type, types.String
  field :text, types.String
  field :title, types.String
  field :picUrl, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.pic_url if %w[SimpleChatPictureMessage SimpleChatProductMessage].include?(obj.class.name)
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
      obj.group_with_adjacent if %w[SimpleChatPictureMessage SimpleChatProductMessage].include?(obj.class.name)
    }
  end
end
