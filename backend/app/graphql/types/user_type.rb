Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :email, !types.String
  field :name, types.String
  field :imgUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.img_url }
  end
  field :img, Types::ImgType do
    resolve ->(obj, _args, _ctx) do
      { url: obj.img_url } if obj.img_url
    end
  end
  field :imgRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
  field :bio, types.String
  field :socialMediaUrl, types.String
end
