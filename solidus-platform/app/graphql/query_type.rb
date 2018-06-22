QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of the schema"

  connection :products, Types::ProductType.connection_type do
    name          "products"
    description   "List of products"

    argument :ids, types[types.ID]
    argument :slug, types.String
    resolve ->(_obj, args, _ctx) {
      case
      when args[:ids].present?
        Spree::Product.find(args[:ids])
      when args[:slug].present?
        Spree::Product.where(slug: args[:slug])
      else
        Spree::Product.all
      end
    }
  end

  field :taxonomies, types[Types::TaxonomyType] do
    name          "taxonomies"
    description   "List of taxonomies"

    resolve ->(_obj, _args, _ctx) {
      Spree::Taxonomy.all
    }
  end
end
