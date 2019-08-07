Types::ImgType = GraphQL::ObjectType.define do
  name "Img"

  field :url, !types.String do
    resolve ->(obj, _args, _ctx) { obj[:url] }
  end
end
