Fields::ExpositionField = GraphQL::Field.define do
  name "exposition"
  description "Show exposition"
  type Types::ExpositionType

  resolve ->(_obj, _args, _ctx) {
    result = GraphCMS::Client.query(ExpositionQuery, variables: {domain: "www.papajohns.com"})
    result.data.exposition
  }
end
