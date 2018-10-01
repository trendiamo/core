Fields::ExpositionsField = GraphQL::Field.define do
  name "expositions"
  description "List expositions"
  type !types[Types::ExpositionType]

  resolve ->(_obj, _args, _ctx) {
    result = GraphCMS::Client.query(ExpositionsQuery)
    result.data.expositions
  }
end
