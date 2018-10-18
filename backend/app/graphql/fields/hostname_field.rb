Fields::HostnameField = GraphQL::Field.define do
  name "hostname"
  description "Show hostname"
  type Types::HostnameType
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { id: ctx[:variables][:where][:id] }
    ExecuteQuery.execute(HostnameQuery, variables, :hostname)
  }
end
