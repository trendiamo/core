Fields::TaxonField = GraphQL::Field.define do
  name "taxon"
  description "Get taxon by permalink"
  argument :permalink, !types.String
  type Types::TaxonType
  resolve ->(_obj, args, _ctx) do
    Spree::Taxon.find_by(permalink: args[:permalink])
  end
end
