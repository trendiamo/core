Types::TaxonType = GraphQL::ObjectType.define do
  name "Taxon"

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :permalink, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj.permalink.gsub(%r{collections/}, "")
    }
  end
  field :iconUrl, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj.icon.url
    }
  end
  connection :products, Types::ProductType.connection_type do
    resolve ->(obj, _args, _ctx) {
      obj.products
    }
  end
end
