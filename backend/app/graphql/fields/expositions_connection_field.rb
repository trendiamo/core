Fields::ExpositionsConnectionField = GraphQL::ObjectType.define do
  name "expositionsConnection"

  connection :expositions, Types::ExpositionType.connection_type do
    resolve ->(_obj, _args, _ctx) {
      result = GraphCMS::Client.query(ExpositionsQuery)
      result.data.expositions
    }
  end
end
