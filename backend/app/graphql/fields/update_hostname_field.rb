Fields::UpdateHostnameField = GraphQL::Field.define do
  name "updateHostname"
  type Types::HostnameType
  argument :data, !Types::HostnameInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    variables = { id: ctx[:variables][:where][:id] }
    @graphcms_hostname = ExecuteQuery.execute(HostnameQuery, variables, :hostname)

    Hostname = Struct.new(*@graphcms_hostname.to_h.symbolize_keys.keys)
    hostname_record = Hostname.new(*@graphcms_hostname.to_h.values)
    authorize(hostname_record)

    id = ctx[:variables][:where][:id]
    variables = { id: id, hostname: args[:data][:hostname], status: args[:data][:status] }
    ExecuteQuery.execute(UpdateHostnameMutation, variables, :update_hostname)
  }
end
