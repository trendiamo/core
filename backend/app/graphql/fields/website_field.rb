Fields::WebsiteField = GraphQL::Field.define do
  name "website"
  description "Show website"
  type Types::WebsiteType
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { id: ctx[:variables][:where][:id] }
    ExecuteQuery.execute(WebsiteQuery, variables, :website)
  }
end
