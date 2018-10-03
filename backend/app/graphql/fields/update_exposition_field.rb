Fields::UpdateExpositionField = GraphQL::Field.define do
  name "updateExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    # use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    # authorize(:nil)
    data = { domain: args[:data][:domain], description: args[:data][:description], ctaUrl: args[:data][:ctaUrl],
             ctaText: args[:data][:ctaText], }
    result = GraphCMS::Client.query(UpdateExpositionMutation, variables: data)
    result.data.update_exposition
  }
end
