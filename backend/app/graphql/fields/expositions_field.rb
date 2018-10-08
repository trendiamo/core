Fields::ExpositionsField = GraphQL::Field.define do
  name "expositions"
  description "List expositions"
  type !types[Types::ExpositionType]

  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    return unless current_user.exposition_hostname
    result = GraphCMS::Client.query(ExpositionsQuery, variables: { domains: [current_user.exposition_hostname] })
    result.data.expositions
  }
end
