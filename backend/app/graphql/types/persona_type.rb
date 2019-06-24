Types::PersonaType = GraphQL::ObjectType.define do
  name "Persona"

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :instagramUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.instagram_url }
  end
  field :profilePic, Types::PicType do
    resolve ->(obj, _args, _ctx) { { url: obj.profile_pic.url } }
  end
  field :picRect, Types::PicRectType do
    resolve ->(obj, _args, _ctx) { obj.pic_rect }
  end
  field :profilePicAnimationUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.profile_pic_animation_url }
  end
end
