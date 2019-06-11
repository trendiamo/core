Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :email, !types.String
  field :profilePicUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.profile_pic_url }
  end
  field :picRect, Types::PicRectType do
    resolve ->(obj, _args, _ctx) { obj.pic_rect }
  end
end
