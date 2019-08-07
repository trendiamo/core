Types::ProductPickType = GraphQL::ObjectType.define do
  name "ProductPick"

  field :id, !types.ID
  field :url, !types.String
  field :name, !types.String
  field :description, !types.String
  field :displayPrice, types.String do
    resolve ->(obj, _args, _ctx) {
      obj.display_price
    }
  end
  field :picture, !Types::ImgType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.img.url }
    }
  end
  field :img, !Types::ImgType do
    resolve ->(obj, _args, _ctx) {
      { url: obj.img.url }
    }
  end
  field :picRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
  field :imgRect, Types::ImgRectType do
    resolve ->(obj, _args, _ctx) { obj.img_rect }
  end
end
