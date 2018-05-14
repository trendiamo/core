Types::ShopifyProductType = GraphQL::ObjectType.define do
  name "ShopifyProductType"

  field :id, !types.ID
  field :title, !types.String
  field :vendor, types.String
  field :tags, types.String
  field :description, types.String do
    resolve ->(obj, _args, _ctx) { obj.body_html }
  end
  field :featuredImage, types.String do
    resolve ->(obj, _args, _ctx) { obj.image.src }
  end
end
