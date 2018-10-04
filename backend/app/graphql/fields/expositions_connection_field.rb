Fields::ExpositionsConnectionField = GraphQL::ObjectType.define do
  name "expositionsConnection"

  connection :expositions, Types::ExpositionType.connection_type do
    resolve ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
      authorize(:nil)
      result = GraphCMS::Client.query(ExpositionsQuery)
      result.data.expositions
    }
  end
end
