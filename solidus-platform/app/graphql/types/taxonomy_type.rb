Types::TaxonomyType = GraphQL::ObjectType.define do
  name "Taxonomy"

  field :id, types.ID
  field :position, types.Int
  field :name, types.String

  connection :taxons, Types::TaxonType.connection_type do
    name          "taxons"
    description   "List of taxons"

    argument :ids, types[types.ID]
    resolve ->(obj, _args, _ctx) {
      obj.taxons
    }
  end
end
