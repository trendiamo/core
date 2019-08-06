Types::SellerType = GraphQL::ObjectType.define do
  name "Seller"

  field :id, !types.ID
  field :name, !types.String
  field :bio, !types.String
  field :instagramUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.instagram_url }
  end
  field :profilePic, Types::PicType do
    resolve ->(obj, _args, _ctx) { { url: obj.profile_pic.url } }
  end
  field :picRect, Types::PicRectType do
    resolve ->(obj, _args, _ctx) { obj.pic_rect }
  end
  field :profilePicAnimation, Types::PicType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.profile_pic_animation.url } if obj.profile_pic_animation
    }
  end
end
