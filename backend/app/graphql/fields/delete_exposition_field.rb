Fields::DeleteExpositionField = GraphQL::Field.define do
  name "deleteExposition"
  type Types::ExpositionType
  argument :id, types.ID
  resolve Resolver.new ->(obj, args, ctx) {
    # use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    # authorize(:nil)
    id = ctx[:variables][:where][:id]
    result = GraphCMS::Client.query(DeleteExpositionMutation, variables: { id: id })
    result.data.delete_exposition
  }
end
