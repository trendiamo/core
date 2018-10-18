Fields::DeleteHostnameField = GraphQL::Field.define do
  name "deleteHostname"
  type Types::HostnameType
  argument :id, types.ID
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    variables = { id: ctx[:variables][:where][:id] }
    @graphcms_hostname = ExecuteQuery.execute(HostnameQuery, variables, :hostname)

    Hostname = Struct.new(*@graphcms_hostname.to_h.symbolize_keys.keys)
    hostname_record = Hostname.new(*@graphcms_hostname.to_h.values)
    authorize(hostname_record)

    variables = { id: ctx[:variables][:where][:id] }
    ExecuteQuery.execute(DeleteHostnameMutation, variables, :delete_hostname)
  }
end
