Fields::CreateExpositionField = GraphQL::Field.define do
  name "createExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    variables = { domain: current_user.exposition_hostname, description: args[:data][:description],
                  ctaUrl: args[:data][:ctaUrl], ctaText: args[:data][:ctaText], }
    ExecuteQuery.execute(CreateExpositionMutation, variables, :create_exposition)
  }
end
