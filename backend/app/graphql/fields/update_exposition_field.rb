Fields::UpdateExpositionField = GraphQL::Field.define do
  name "updateExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    variables = { id: ctx[:variables][:where][:id], domain: args[:domain] }
    @graphcms_exposition = ExecuteQuery.execute(ExpositionQuery, variables, :exposition)

    Exposition = Struct.new(*@graphcms_exposition.to_h.symbolize_keys.keys)
    exposition_record = Exposition.new(*@graphcms_exposition.to_h.values)
    authorize(exposition_record)

    id = ctx[:variables][:where][:id]
    variables = { id: id, domain: current_user.exposition_hostname, description: args[:data][:description],
                  ctaUrl: args[:data][:ctaUrl], ctaText: args[:data][:ctaText], }
    ExecuteQuery.execute(UpdateExpositionMutation, variables, :update_exposition)
  }
end
