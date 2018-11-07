Main::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :addMessage, Mutations::AddMessageMutation
end
