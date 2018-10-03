Fields::ExpositionsField = GraphQL::Field.define do
  name "expositions"
  description "List expositions"
  type !types[Types::ExpositionType]

  resolve ->(obj, args, ctx) {
    # use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    # authorize(:nil)
    result = GraphCMS::Client.query(ExpositionsQuery)
    result.data.expositions
  }
end
