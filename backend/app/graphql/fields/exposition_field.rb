Fields::ExpositionField = GraphQL::Field.define do
  name "exposition"
  description "Show exposition"
  type Types::ExpositionType
  argument :domain, types.String
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    domain = args[:domain]
    id = ctx[:variables][:where][:id]
    result = GraphCMS::Client.query(ExpositionQuery, variables: { id: id, domain: domain })
    result.data.exposition
  }
end
