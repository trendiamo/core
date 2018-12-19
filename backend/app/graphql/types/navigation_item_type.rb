Types::NavigationItemType = GraphQL::ObjectType.define do
  name "NavigationItem"

  field :id, !types.ID
  field :text, !types.String
  field :url, !types.String
  field :picture, !Types::PicType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.pic_url }
    }
  end
end
