Types::ProductPickType = GraphQL::ObjectType.define do
  name "ProductPick"

  field :id, !types.ID
  field :url, !types.String
  field :name, !types.String
  field :description, !types.String
  field :displayPrice, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj.display_price
    }
  end
  field :picture, !Types::PicType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.pic_url }
    }
  end
  field :picRect, Types::PicRectType do
    resolve ->(obj, _args, _ctx) { obj.pic_rect }
  end
end
