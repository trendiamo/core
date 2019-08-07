Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :email, !types.String
  field :profilePicUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.img_url }
  end
  field :imgUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.img_url }
  end
  field :picRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
  field :imgRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
end
