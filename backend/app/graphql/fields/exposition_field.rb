Fields::ExpositionField = GraphQL::Field.define do
  name "exposition"
  description "Show exposition"
  type Types::ExpositionType
  argument :domain, types.String
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { id: ctx[:variables][:where][:id], domain: args[:domain] }
    ExecuteQuery.execute(ExpositionQuery, variables, :exposition)
  }
end
