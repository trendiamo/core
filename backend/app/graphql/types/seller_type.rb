Types::SellerType = GraphQL::ObjectType.define do
  name "Seller"

  field :id, !types.ID
  field :name, !types.String
  field :bio, !types.String
  field :instagramUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.instagram_url }
  end
  field :img, Types::ImgType do
    resolve ->(obj, _args, _ctx) { { url: obj.img.url } }
  end
  field :imgRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
  field :animatedImg, Types::ImgType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.animated_img.url } if obj.animated_img
    }
  end
end
