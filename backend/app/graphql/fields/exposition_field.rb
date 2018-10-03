Fields::ExpositionField = GraphQL::Field.define do
  name "exposition"
  description "Show exposition"
  type Types::ExpositionType

  resolve ->(obj, args, ctx) {
    # use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    # authorize(:nil)
    result = GraphCMS::Client.query(ExpositionQuery, variables: { domain: "www.papajohns.com" })
    result.data.exposition
  }
end
