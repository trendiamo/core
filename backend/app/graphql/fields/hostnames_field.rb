Fields::HostnamesField = GraphQL::Field.define do
  name "hostnames"
  description "List hostnames"
  type !types[Types::HostnameType]

  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { id: current_user.website_ref }
    ExecuteQuery.execute(HostnamesQuery, variables, :hostnames)
  }
end
