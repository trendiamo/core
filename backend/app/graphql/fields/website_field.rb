Fields::WebsiteField = GraphQL::Field.define do
  name "website"
  description "Show website"
  argument :hostname, types.String
  type Types::WebsiteType
  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    chain = Website
    chain = chain.where("array[:hostname]::varchar[] @> hostnames", hostname: args[:hostname]) if args[:hostname]
    chain.first
  }
end
