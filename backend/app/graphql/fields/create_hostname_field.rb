Fields::CreateHostnameField = GraphQL::Field.define do
  name "createHostname"
  type Types::HostnameType
  argument :data, !Types::HostnameInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { website_id: current_user.website_ref, hostname: args[:data][:hostname], status: args[:data][:status] }
    ExecuteQuery.execute(CreateHostnameMutation, variables, :create_hostname)
  }
end
