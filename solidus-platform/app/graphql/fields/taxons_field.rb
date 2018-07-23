Fields::TaxonsField = GraphQL::Field.define do
  name "taxons"
  description "List all taxons"
  type types[Types::TaxonType]
  resolve ->(_obj, _args, _ctx) do
    Spree::Taxon.all
  end
end
