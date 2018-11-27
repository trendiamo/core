Types::PicType = GraphQL::ObjectType.define do
  name "Pic"

  field :url, !types.String do
    resolve ->(obj, _args, _ctx) { obj[:url] }
  end
end
