Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id, !types.ID
  field :name, !types.String
  field :slug, !types.String
  field :description, !types.String
  field :priceInCents, !types.Int do
    resolve ->(obj, _args, _ctx) { (obj.price * 100).to_i }
  end
  field :featuredImage, types.String do
    resolve ->(obj, _args, _ctx) do
      obj.images.first.attachment.url
    end
  end
  field :images, types[types.String] do
    resolve ->(obj, _args, _ctx) do
      obj.images.map(&:attachment).map(&:url)
    end
  end
  field :master, !Types::VariantType
  connection :variants, Types::VariantType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.variants.all
    }
  end
end
