Types::CollectionType = GraphQL::ObjectType.define do
  name "CollectionType"

  field :id, !types.ID
  field :handle, !types.String
  field :title, !types.String
  field :type, !types.String
  field :profilePicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.profile_pic_url }
  end
  field :coverPicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.cover_pic_url }
  end
  field :description, !types.String
end
