Fields::WebsitesField = GraphQL::Field.define do
  name "websites"
  description "List websites"
  type !types[Types::WebsiteType]

  resolve ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { ids: [current_user.website_ref] }
    ExecuteQuery.execute(WebsitesQuery, variables, :websites)
  }
end
