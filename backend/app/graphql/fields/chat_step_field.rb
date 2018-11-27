Fields::ChatStepField = GraphQL::Field.define do
  name "chat step"
  description "Show chat step"
  type Types::ChatStepType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    ChatStep.find(args[:id])
  }
end
