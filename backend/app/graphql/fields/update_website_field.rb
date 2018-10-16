Fields::UpdateWebsiteField = GraphQL::Field.define do
  name "updateWebsite"
  type Types::WebsiteType
  argument :data, !Types::WebsiteInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    variables = { id: ctx[:variables][:where][:id] }
    @graphcms_website = ExecuteQuery.execute(WebsiteQuery, variables, :website)

    Website = Struct.new(*@graphcms_website.to_h.symbolize_keys.keys)
    website_record = Website.new(*@graphcms_website.to_h.values)
    authorize(website_record)

    variables = { id: current_user.website_ref, name: args[:data][:name],
                  title: args[:data][:title], subtitle: args[:data][:subtitle], status: args[:data][:status], }
    ExecuteQuery.execute(UpdateWebsiteMutation, variables, :update_website)
  }
end
