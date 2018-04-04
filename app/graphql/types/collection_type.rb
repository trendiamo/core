Types::CollectionType = GraphQL::ObjectType.define do
  name "CollectionType"

  field :id, !types.ID
  field :handle, !types.String
  field :title, !types.String
  field :type, !types.String
  field :profile_pic_url, !types.String
  field :cover_pic_url, !types.String
  field :description, !types.String
end
