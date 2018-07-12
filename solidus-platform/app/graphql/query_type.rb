QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of the schema"

  field :product, Fields::ProductField
  field :products, Fields::ProductsField
  field :taxon, Fields::TaxonField
  field :taxons, Fields::TaxonsField
end
