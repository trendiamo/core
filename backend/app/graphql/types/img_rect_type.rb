Types::ImgRectType = GraphQL::ObjectType.define do
  name "ImgRect"

  field :x, types.Int do
    resolve ->(obj, _args, _ctx) { obj["x"] }
  end
  field :y, types.Int do
    resolve ->(obj, _args, _ctx) { obj["y"] }
  end
  field :height, types.Int do
    resolve ->(obj, _args, _ctx) { obj["height"] }
  end
  field :width, types.Int do
    resolve ->(obj, _args, _ctx) { obj["width"] }
  end
end
