Fields::CreateExpositionField = GraphQL::Field.define do
  name "createExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    return if current_user.exposition_hostname
    data = { domain: args[:data][:domain], description: args[:data][:description], ctaUrl: args[:data][:ctaUrl],
             ctaText: args[:data][:ctaText], }
    result = GraphCMS::Client.query(CreateExpositionMutation, variables: data)
    current_user.update(exposition_hostname: args[:data][:domain]) if result.errors.messages.empty?
    result.data.create_exposition
  }
end
