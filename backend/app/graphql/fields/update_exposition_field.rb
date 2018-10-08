Fields::UpdateExpositionField = GraphQL::Field.define do
  name "updateExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:nil)
    id = ctx[:variables][:where][:id]
    variables = { id: id, domain: current_user.exposition_hostname, description: args[:data][:description],
                  ctaUrl: args[:data][:ctaUrl], ctaText: args[:data][:ctaText], }
    ExecuteQuery.execute(UpdateExpositionMutation, variables, :update_exposition)
  }
end
